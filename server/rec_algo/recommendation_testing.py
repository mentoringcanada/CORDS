import csv
import os
import psycopg2
from sklearn import cluster
from sklearn.cluster import Birch
import numpy as np
from datetime import datetime
import queries


def get_db():
    connection = psycopg2.connect(os.environ['PSQL_CONNECT_STR'])
    return connection.cursor(), connection


def get_taxonomies():
    cursor, connection = get_db()
    cursor.execute(queries.get_popular_taxonomies)
    return cursor.fetchall()


def get_recommended_clusters_from_taxonomies(taxonomies):
    cursor, connection = get_db()
    # sanitize inputs
    ok_chars = ' *-.0123456789ABCDEFGHIJKLMNOPQRSTVWXYZ'
    for char in taxonomies:
        if char not in ok_chars:
            return {'error': 'bar character'}
    data = taxonomies.split(',')
    clusters = get_cluster_ID_recommendations_from_basket(data)
    IDs = [x[0] for x in clusters]
    output = {}
    for ID in IDs:
        cursor.execute(queries.get_cluster_constituents, (ID,))
        output[str(ID)] = cursor.fetchall()
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
    cursor.execute(queries.get_distinct_taxonomies)
    taxonomies = cursor.fetchall()
    for tax in taxonomies:
        print(tax)
        cursor.execute(queries.assign_cluster_id_to_taxonomy, (tax, tax,))
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


def assign_clusters(n_clusters=100):
    cursor, connection = get_db()
    # pull all vectors and IDs
    # cluster so that everything has a non-zero label
    # assign the labels back into the database
    # get vectors
    vectors, index_to_ID = get_all_vectors_and_IDs()
    # creating clusterer
    clusterer = Birch(n_clusters=n_clusters)
    # fitting and predicting
    labels = clusterer.fit_predict(vectors)
    
    #found all labels
    try:
        cursor.execute("""ALTER TABLE resources ADD COLUMN cluster_id integer;""")
        connection.commit()
    except:
        cursor, connection = get_db()
    for i in range(len(labels)):
        print(i)
        cursor.execute(queries.assign_clusters_to_vectors, (int(labels[i]), index_to_ID[i]))
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
    cursor.execute(queries.get_restricted_cluster_recommendations, (existing_clusters, existing_clusters))
    return cursor.fetchall()


def get_random_referral_group():
    cursor, connection = get_db()
    # get random call_id with multiple referrals
    cursor.execute(queries.get_random_multiple_referral_call)
    return cursor.fetchall()


def check_if_random_reference_is_recommendable(output_logs = False):
    cursor, connection = get_db()
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
    result, order = is_item_in_clusters(to_assess_to_algo, recommended_cluster_labels)
    tally_item.append(str(result))
    tally_item.append(str(order))
    if output_logs:
        print('it was in the', order, 'cluster')
    tally_item.append(str(end-start))
    return tally_item


def check_if_random_unique_referrals_are_recommended(output_logs = False):
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
    result, order = is_item_in_clusters(to_assess_to_algo, recommended_cluster_labels)
    tally_item.append(str(result))
    tally_item.append(str(order))
    if output_logs:
        print('it was in the', order, 'cluster')
    tally_item.append(str(end-start))
    return tally_item


def is_item_in_clusters(item, cluster_labels, output_logs = False):
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


def recluster():
    assign_clusters(200)
    assign_cluster_to_taxnomies()


def iterate(iterations=200):
    tally = [['referral_id', 'taxonomy_to_find', 'to_feed_to_algo', 'recommended_cluster_labels', 'correct_labels', 'cluster_order', 'recommendation_time']]
    correct = 0
    for _ in range(iterations):
        tally.append(check_if_random_reference_is_recommendable())
        # tally.append(check_if_random_unique_referrals_are_recommended())
        if tally[-1][4] == 'True':
            correct += 1
        print('correct:', correct, 'out of:', _ + 1, '. Scheduled to do', iterations)

    f = open('results_non_unique.csv', 'a')
    for line in tally:
        f.write('|'.join(line) + '\n')

    f.close()


if __name__ == '__main__':
    iterate()