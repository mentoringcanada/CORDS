import csv
import os
import psycopg2
from sklearn.cluster import Birch
import numpy as np


connection = psycopg2.connect(os.environ['PSQL_CONNECT_STR'])
cursor = connection.cursor()


def get_all_vectors_and_IDs():
    print('loading app state')
    cursor.execute("""SELECT resource_agency_number, description_vector
    FROM resources
    WHERE description_vector IS NOT NULL;""")
    vectors_and_IDs = cursor.fetchall()
    print('got all vectors')
    vectors = np.asarray([np.asarray(row[1]).astype(np.float32)
                         for row in vectors_and_IDs])
    print('converted all vectors, getting IDs')
    index_to_ID = [row[0] for row in vectors_and_IDs]
    print('returning')
    return vectors, index_to_ID


def assign_cluster_to_taxnomies():
    cursor.execute("""SELECT distinct taxonomy_code FROM rec_data;""")
    taxonomies = cursor.fetchall()
    for tax in taxonomies:
        print(tax)
        cursor.execute("""UPDATE
        rec_data
    SET
        cluster_ID = (
            select cluster_id from
            (SELECT
                cluster_id,
                count(*)
            FROM
                service_taxonomies st
            INNER JOIN
                resources r
            ON
                st.resource_agency_number = r.resource_agency_number
            WHERE
                taxonomy_code = %s
            GROUP BY
                cluster_id
            ORDER BY
                2 DESC
            LIMIT
                1) clusters
        )
    WHERE
        taxonomy_code = %s;
    """, (tax, tax,))
    connection.commit()


def load_pairs_to_database():
    cursor.execute("""CREATE TABLE IF NOT EXISTS rec_data (
        call_report_number varchar,
        taxonomy_code varchar,
        taxonomy_name varchar
    );""")
    # read csv
    data = []
    with open('rec_algo/data/2019.csv', newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=',', quotechar='"')
        print(next(reader))
        for row in reader:
            data.append([
                row[1],
                row[2],
                row[3]
            ])
    # insert (ID, taxonomy) into database
    c = 0
    for row in data:
        print(c)
        cursor.execute("""INSERT INTO rec_data
        (call_report_number, taxonomy_code, taxonomy_name) VALUES (
            %s, %s, %s
        );
        """, row)
        c += 1
    connection.commit()


def load_taxonomy_codes_per_service_to_database():
    # check if there are records in the database already
    # if not, create table and proceed
    cursor.execute("DROP TABLE service_taxonomies;")
    cursor.execute("""CREATE TABLE IF NOT EXISTS service_taxonomies (
        resource_agency_number varchar,
        taxonomy_code varchar
    );""")
    # read csv
    data = []
    with open('GTA_211_Services.csv', newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=',', quotechar='"')
        print(next(reader))
        for row in reader:
            all_taxes = row[-3].split('; ')
            for taxo in all_taxes:
                data.append([
                    row[0],
                    taxo
                ])
    # insert (ID, taxonomy) into database
    c = 0
    for row in data:
        print(c)
        cursor.execute("""INSERT INTO service_taxonomies
        (resource_agency_number, taxonomy_code) VALUES (
            %s, %s
        );
        """, row)
        c += 1
    connection.commit()


def assign_clusters():
    # pull all vectors and IDs
    # cluster so that everything has a non-zero label
    # assign the labels back into the database
    print('getting vectors')
    vectors, index_to_ID = get_all_vectors_and_IDs()
    print('ok, creating clusterer')
    clusterer = Birch(n_clusters=100)
    print('fitting and predicting', len(vectors), 'vectors')
    labels = clusterer.fit_predict(vectors)
    print('found all labels')
    # try:
    #     cursor.execute("""ALTER TABLE resources ADD COLUMN cluster_id integer;""")
    #     connection.commit()
    # except:
    #     pass
    for i in range(len(labels)):
        print(i)
        cursor.execute("""UPDATE resources SET cluster_id = %s WHERE resource_agency_number = %s;""", (int(labels[i]), index_to_ID[i]))
    connection.commit()


def get_cluster_ID_recommendations_from_basket(item_IDs):
    cursor.execute("""SELECT cluster_id 
    FROM (
        SELECT
            cluster_id,
            count(*)
        FROM
            service_taxonomies st
        INNER JOIN
            resources r
        ON
            st.resource_agency_number = r.resource_agency_number
        WHERE
            taxonomy_code = any(%s)
        GROUP BY
            cluster_id
        ORDER BY
            2 DESC
        LIMIT
            1 
    ) clusters ;
    """, (item_IDs,))
    existing_clusters = [x[0] for x in cursor.fetchall()]
    print('existing clusters', existing_clusters)
    cursor.execute("""SELECT
        cluster_id
    FROM
        (
            SELECT
                cluster_id,
                SUM(call_points_table.call_points) as cluster_points
            FROM
                rec_data rc
                INNER JOIN (
                    SELECT
                        call_report_number,
                        COUNT(*) as call_points
                    FROM
                        rec_data
                    WHERE
                        cluster_id = any(%s::int[])
                    GROUP BY
                        call_report_number
                ) call_points_table ON rc.call_report_number = call_points_table.call_report_number
            GROUP BY cluster_id
            ORDER BY
                2 DESC
            LIMIT
                5
        ) clusters""", (existing_clusters,))
    return cursor.fetchall()


def get_random_referral_group():
    # get random call_id with multiple referrals
    cursor.execute("""SELECT
        one_id.call_report_number,
        taxonomy_code
    FROM
        (
            SELECT
                multiples.call_report_number,
                random()
            FROM
                rec_data data
                INNER JOIN (
                    SELECT
                        call_report_number,
                        count(*)
                    FROM
                        rec_data
                    GROUP BY
                        call_report_number
                    HAVING
                        count(*) > 1
                ) multiples ON data.call_report_number = multiples.call_report_number
            ORDER BY 2 LIMIT 1
        ) one_id
        INNER JOIN rec_data rc ON rc.call_report_number = one_id.call_report_number;
    """)
    return cursor.fetchall()


def check_if_random_reference_is_recommendable():
    base_group = get_random_referral_group()
    print('testing referral id:', base_group[0][0])
    tally_item = [base_group[0][0]]
    assert len(base_group) > 1
    to_feed_to_algo = [e[1] for e in base_group[1:]]
    print('taxonomy codes in referral, fed to system:', to_feed_to_algo)
    to_assess_to_algo = base_group[0][1]
    tally_item.append(str(to_assess_to_algo))
    tally_item.append(str(to_feed_to_algo))
    recommended_cluster_labels = get_cluster_ID_recommendations_from_basket(
        to_feed_to_algo)
    tally_item.append(str(recommended_cluster_labels))
    print(recommended_cluster_labels)
    output = is_item_in_clusters(to_assess_to_algo, recommended_cluster_labels)
    print(output)
    tally_item.append(str(output))
    return tally_item



def is_item_in_clusters(item, cluster_labels):
    print('is cluster for', item, 'in clusters', cluster_labels)
    # get_cluster_labels for item
    cursor.execute("""SELECT cluster_id FROM resources WHERE resource_agency_number in
    (SELECT resource_agency_number FROM service_taxonomies WHERE taxonomy_code = %s);""", (item,))
    data = cursor.fetchall()
    # return true/false
    working = False
    for cluster_id in data:
        if cluster_id in cluster_labels:
            working = True
            break
    return working


if __name__ == '__main__':
    tally = [['referral_id', 'taxonomy_to_find', 'to_feed_to_algo', 'recommended_cluster_labels', 'correct_labels']]
    correct = 0
    for _ in range(200):
        tally.append(check_if_random_reference_is_recommendable())
        if tally[-1][-1] == 'True':
            correct += 1
        print('correct:', correct, 'out of:', _ + 1)

    f = open('results.csv', 'a')
    for line in tally:
        f.write('|'.join(line) + '\n')

    f.close()
