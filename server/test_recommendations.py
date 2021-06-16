import csv
import queries
import model
from services import cluster_recommendations


def setup_db():
    model.execute("""CREATE TABLE IF NOT EXISTS clusters (
        cluster_id INT,
        centre DOUBLE PRECISION[],
        two_dim POINT,
        num_services INT,
        summary varchar
    );""")
    model.execute(
        """ALTER TABLE resources ADD COLUMN cluster_id integer;""")



def fill_in_data():
    taxonomies = model.execute(queries.get_distinct_taxonomies)
    for tax in taxonomies:
        model.execute("""update service_taxonomies
    SET taxonomy_name = (select taxonomy_name from rec_data WHERE taxonomy_code = %s LIMIT 1)
    WHERE taxonomy_code = (select taxonomy_code from rec_data WHERE taxonomy_code = %s LIMIT 1);""", (tax[0], tax[0],))


def load_pairs_to_database():
    model.execute(queries.create_recommendations_table)
    # read csv
    data = []
    with open('rec_algo/data/2019.csv', newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=',', quotechar='"')
        for row in reader:
            data.append([
                row[1],
                row[2],
                row[3]
            ])
    # insert (ID, taxonomy) into database
    c = 0
    for row in data:
        model.execute(queries.load_recommendation_data, row)
        c += 1


def load_taxonomy_codes_per_service_to_database():
    # check if there are records in the database already
    # if not, create table and proceed
    model.execute(queries.create_service_taxonomies_table)
    # read csv
    data = []
    with open('GTA_211_Services.csv', newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=',', quotechar='"')
        next(reader)
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
        model.execute(queries.insert_service_taxonomy, row)
        c += 1


def is_item_in_clusters(item, cluster_labels):
    # get_cluster_labels for item
    data = model.execute(queries.get_applicable_clusters_to_taxonomy, ([item],))[0]['cluster_id']
    try:
        index = cluster_labels.index(data)
    except:
        index = -1
    return (index > -1), index


def check_if_random_reference_is_recommendable():
    base_group = get_random_referral_group()
    tally_item = [base_group[0]['call_report_number']]
    to_feed_to_algo = [e['taxonomy_code'] for e in base_group[1:]]
    to_assess_to_algo = base_group[0]['taxonomy_code']
    tally_item.append(str(to_assess_to_algo))
    tally_item.append(str(to_feed_to_algo))
    recommended_cluster_labels = cluster_recommendations.get_cluster_recommendations_from_taxonomies(
        to_feed_to_algo, 10)
    tally_item.append(str(recommended_cluster_labels))
    result, order = is_item_in_clusters(
        to_assess_to_algo, recommended_cluster_labels)
    tally_item.append(str(result))
    tally_item.append(str(order))
    return tally_item


def get_random_referral_group():
    # get random call_id with multiple referrals
    return model.execute(queries.get_random_multiple_referral_call)


def iterate(how_many_tests=200):
    tally = [['referral_id', 'taxonomy_to_find', 'to_feed_to_algo',
              'recommended_cluster_labels', 'correct_labels', 'cluster_order']]
    correct = 0
    for _ in range(how_many_tests):
        tally.append(check_if_random_reference_is_recommendable())
        if tally[-1][4] == 'True':
            correct += 1

    f = open('test_results.csv', 'a')
    for line in tally:
        f.write('|'.join(line) + '\n')

    f.close()


# data = model.execute("""select cluster_id, taxonomy_code, count(*) 
# from resources r
# inner join service_taxonomies st
#     ON r.resource_agency_number = st.resource_agency_number
# group by cluster_id, taxonomy_code
# order by 1, 3 desc;""")
# f = open('figure_out.csv', 'a')
# for d in data:
#     f.write(
#         str(d['cluster_id']) + ',' +
#         str(d['taxonomy_code']) + ',' +
#         str(d['count']) + '\n'
#     )

if __name__ == '__main__':
    iterate()
