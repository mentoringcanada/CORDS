import csv
import os
import psycopg2
from psycopg2.extras import execute_values
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
import numpy as np
from datetime import datetime
import queries


def get_db():
    connection = psycopg2.connect(os.environ['PSQL_CONNECT_STR'])
    return connection.cursor(), connection


def setup_db():
    cursor, connection = get_db()
    cursor.execute("""CREATE TABLE IF NOT EXISTS clusters (
        cluster_id INT,
        centre DOUBLE PRECISION[],
        two_dim POINT,
        num_services INT
    );""")
    connection.commit()
    cursor.execute(
        """ALTER TABLE resources ADD COLUMN cluster_id integer;""")
    connection.commit()


def get_all_taxonomies():
    cursor, connection = get_db()
    cursor.execute(queries.get_popular_taxonomies)
    return cursor.fetchall()


def get_all_clusters():
    cursor, connection = get_db()
    cursor.execute(queries.get_clusters_data)
    return cursor.fetchall()


def get_cluster(cluster_id):
    cursor, connection = get_db()
    cursor.execute(queries.get_cluster_data, (cluster_id,))
    cluster_row = cursor.fetchall()
    cursor.execute(queries.get_all_items_from_cluster, (cluster_id,))
    items = cursor.fetchall()
    return {
        "cluster": cluster_row,
        "items": items,
    }


def get_recommended_clusters_from_taxonomies(taxonomies):
    cursor, connection = get_db()
    # sanitize inputs
    ok_chars = ' *-.,0123456789ABCDEFGHIJKLMNOPQRSTVWXYZ'
    for char in taxonomies:
        if char not in ok_chars:
            return {'error': 'bar character'}
    data = taxonomies.split(',')
    clusters = get_cluster_ID_recommendations_from_basket(data)
    IDs = [x[0] for x in clusters]
    output = {}
    for ID in IDs:
        cursor.execute(queries.get_cluster_data, (ID,))
        output[str(ID)] = {'cluster_data': cursor.fetchall()}
        cursor.execute(
            queries.get_number_of_offered_services_in_cluster, (ID,))
        output[str(ID)]["taxonomies_included"] = cursor.fetchall()
    return output


def get_all_vectors_and_IDs():
    cursor, connection = get_db()
    # loading app state
    cursor.execute(queries.get_all_vectors_and_IDs)
    vectors_and_IDs = cursor.fetchall()
    # got all vectors
    vectors = np.asarray([np.asarray(row[1]).astype(np.float32)
                         for row in vectors_and_IDs])
    # converted all vectors, getting IDs
    index_to_ID = [row[0] for row in vectors_and_IDs]
    # returning
    return vectors, index_to_ID


def assign_cluster_to_taxnomies():
    cursor, connection = get_db()
    cursor.execute(queries.get_taxonomies_clusters)
    pairs = cursor.fetchall()
    data = []
    for pair in pairs:
        data.append([pair[0], pair[1]])
    execute_values(cursor, queries.assign_cluster_id_to_taxonomy, data, page_size=300)
    connection.commit()


def fill_in_data():
    cursor, connection = get_db()
    cursor.execute(queries.get_distinct_taxonomies)
    taxonomies = cursor.fetchall()
    for tax in taxonomies:
        cursor.execute("""update service_taxonomies
    set taxonomy_name = (select taxonomy_name from rec_data WHERE taxonomy_code = %s LIMIT 1)
    WHERE taxonomy_code = (select taxonomy_code from rec_data WHERE taxonomy_code = %s LIMIT 1);""", (tax[0], tax[0],))
    connection.commit()


def load_pairs_to_database():
    cursor, connection = get_db()
    cursor.execute(queries.create_recommendations_table)
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
        cursor.execute(queries.load_recommendation_data, row)
        c += 1
    connection.commit()


def load_taxonomy_codes_per_service_to_database():
    cursor, connection = get_db()
    # check if there are records in the database already
    # if not, create table and proceed
    cursor.execute(queries.create_service_taxonomies_table)
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
        cursor.execute(queries.insert_service_taxonomy, row)
        c += 1
    connection.commit()


def dbify_vector(vector):
    smaller_vector = []
    for element in vector[0]:
        smaller_vector.append(float(element))

    return smaller_vector


def assign_clusters(n_clusters=100):
    cursor, connection = get_db()
    # pull all vectors and IDs
    # cluster so that everything has a non-zero label
    # assign the labels back into the database
    print('get vectors')
    vectors, index_to_ID = get_all_vectors_and_IDs()
    # creating clusterer
    clusterer = KMeans(n_clusters=n_clusters)
    # fitting and predicting
    print('fitting and predicting')
    labels = clusterer.fit_predict(vectors)
    print('label', len(set(labels)))

    # found all labels
    clusters_data = {}
    for label in list(set(labels)):
        # print(label)
        clusters_data[str(label)] = {'label': label}
        clusters_data[str(label)]['services_count'] = list(labels).count(label)
        clusters_in_label = []
        for idx in range(len(vectors)):
            if labels[idx] == label:
                clusters_in_label.append(vectors[idx])
        clusters_in_label = np.asarray(clusters_in_label)
        clusters_data[str(label)]['centre'] = np.asarray(np.matrix(
            clusters_in_label).mean(0)[0])
    centres = []
    centre_IDs = []
    for data in clusters_data:
        clusters_data[data]['label']
        centre_IDs.append(clusters_data[data]['label'])
        centres.append(clusters_data[data]['centre'])
    centres = np.asarray([c[0] for c in centres])
    pca = PCA(n_components=2)
    two_dim_points = pca.fit_transform(centres)
    two_dim_dict = {}
    for idx in range(len(centre_IDs)):
        two_dim_dict[centre_IDs[idx]] = two_dim_points[idx]
    cursor.execute("DELETE FROM clusters;")
    connection.commit()
    for data in clusters_data:
        cursor.execute("""INSERT INTO clusters (cluster_id, centre, two_dim, num_services) VALUES (
            {0}, array{1}, point({2}, {3}), {4}
        );""".format(
            clusters_data[data]['label'],
            dbify_vector(clusters_data[data]['centre']), 
            two_dim_dict[clusters_data[data]['label']][0], 
            two_dim_dict[clusters_data[data]['label']][1], 
            clusters_data[data]['services_count']))
    data = []
    for i in range(len(labels)):
        # print(i)
        data.append([int(labels[i]), index_to_ID[i]])
    execute_values(cursor, queries.assign_clusters_to_vectors, data, page_size=300)
    connection.commit()


def get_cluster_ID_recommendations_from_basket(item_IDs):
    cursor, connection = get_db()
    cursor.execute(queries.get_applicable_clusters_to_taxonomy, (item_IDs,))
    existing_clusters = [x[0] for x in cursor.fetchall()]
    cursor.execute(queries.get_cluster_recommendations, (existing_clusters,))
    return cursor.fetchall()


def get_unique_cluster_ID_recommendations_from_basket(item_IDs):
    cursor, connection = get_db()
    cursor.execute(queries.get_applicable_clusters_to_taxonomy, (item_IDs,))
    existing_clusters = [x[0] for x in cursor.fetchall()]
    cursor.execute(queries.get_restricted_cluster_recommendations,
                   (existing_clusters, existing_clusters))
    return cursor.fetchall()


def get_random_referral_group():
    cursor, connection = get_db()
    # get random call_id with multiple referrals
    cursor.execute(queries.get_random_multiple_referral_call)
    return cursor.fetchall()


def check_if_random_reference_is_recommendable(output_logs=False):
    base_group = get_random_referral_group()
    if output_logs:
        print('testing referral id:', base_group[0][0])
    tally_item = [base_group[0][0]]
    assert len(base_group) > 1
    to_feed_to_algo = [e[1] for e in base_group[1:]]
    if output_logs:
        print('taxonomy codes in referral, fed to system:', to_feed_to_algo)
    to_assess_to_algo = base_group[0][1]
    tally_item.append(str(to_assess_to_algo))
    tally_item.append(str(to_feed_to_algo))
    start = datetime.now()
    recommended_cluster_labels = get_cluster_ID_recommendations_from_basket(
        to_feed_to_algo)
    end = datetime.now()
    tally_item.append(str(recommended_cluster_labels))
    if output_logs:
        print(recommended_cluster_labels)
    result, order = is_item_in_clusters(
        to_assess_to_algo, recommended_cluster_labels)
    tally_item.append(str(result))
    tally_item.append(str(order))
    if output_logs:
        print('it was in the', order, 'cluster')
    tally_item.append(str(end-start))
    return tally_item


def check_if_random_unique_referrals_are_recommended(output_logs=False):
    cursor, connection = get_db()
    base_group = get_random_referral_group()
    # call reference ID

    if output_logs:
        print('testing referral id:', base_group[0][0])
    tally_item = [base_group[0][0]]

    # taxonomy IDs
    assert len(base_group) > 1
    IDs = list(set([x[1] for x in base_group]))
    to_feed_to_algo = IDs[1:]
    if output_logs:
        print('taxonomy codes in referral, fed to system:', to_feed_to_algo)
    to_assess_to_algo = IDs[0]
    tally_item.append(str(to_assess_to_algo))
    tally_item.append(str(to_feed_to_algo))

    # recommendation
    start = datetime.now()
    recommended_cluster_labels = get_unique_cluster_ID_recommendations_from_basket(
        to_feed_to_algo)
    end = datetime.now()
    tally_item.append(str(recommended_cluster_labels))
    if output_logs:
        print(recommended_cluster_labels)
    result, order = is_item_in_clusters(
        to_assess_to_algo, recommended_cluster_labels)
    tally_item.append(str(result))
    tally_item.append(str(order))
    if output_logs:
        print('it was in the', order, 'cluster')
    tally_item.append(str(end-start))
    return tally_item


def is_item_in_clusters(item, cluster_labels, output_logs=False):
    cursor, connection = get_db()
    if output_logs:
        print('is cluster for', item, 'in clusters', cluster_labels)
    # get_cluster_labels for item
    cursor.execute(queries.is_item_in_cluster, (item,))
    data = cursor.fetchall()
    # return true/false
    working = False
    c = -1
    for cluster_id in data:
        if cluster_id in cluster_labels:
            working = True
            c = cluster_labels.index(cluster_id)
            break
    return working, c


def recluster(n_clusters=250):
    assign_clusters(n_clusters)
    assign_cluster_to_taxnomies()


def iterate(how_many_tests=200):
    tally = [['referral_id', 'taxonomy_to_find', 'to_feed_to_algo',
              'recommended_cluster_labels', 'correct_labels', 'cluster_order', 'recommendation_time']]
    correct = 0
    for _ in range(how_many_tests):
        tally.append(check_if_random_reference_is_recommendable())
        # tally.append(check_if_random_unique_referrals_are_recommended())
        if tally[-1][4] == 'True':
            correct += 1
        print('correct:', correct, 'out of:', _ + 1,
              '. Scheduled to do', how_many_tests)

    f = open('results_non_unique.csv', 'a')
    for line in tally:
        f.write('|'.join(line) + '\n')

    f.close()


if __name__ == '__main__':
    recluster(100)
    # iterate()
