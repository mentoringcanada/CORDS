import model
import queries
import numpy as np
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA


def dbify_vector(vector):
    smaller_vector = []
    for element in vector[0]:
        smaller_vector.append(float(element))

    return smaller_vector


def get_all_vectors_and_IDs():
    # loading app state
    vectors_and_IDs = model.execute(queries.get_all_vectors_and_IDs)
    # got all vectors
    vectors = np.asarray([np.asarray(row['description_vector']).astype(np.float32)
                         for row in vectors_and_IDs])
    # converted all vectors, getting IDs
    index_to_ID = [row['resource_agency_number'] for row in vectors_and_IDs]
    # returning
    return vectors, index_to_ID


def assign_clusters_to_taxonomies():
    pairs = model.execute(queries.get_taxonomies_clusters)
    data = []
    for pair in pairs:
        data.append([pair['cluster_id'], pair['taxonomy_code']])
    model.execute_many(queries.assign_cluster_id_to_taxonomy, data)


def assign_clusters(n_clusters=100):
    # pull all vectors and IDs
    # cluster so that everything has a non-zero label
    # assign the labels back into the database
    vectors, index_to_ID = get_all_vectors_and_IDs()
    # creating clusterer
    clusterer = KMeans(n_clusters=n_clusters)
    # fitting and predicting
    labels = clusterer.fit_predict(vectors)

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
    model.execute("DELETE FROM clusters;")
    for data in clusters_data:
        model.execute("""INSERT INTO clusters (cluster_id, centre, two_dim, num_services) VALUES (
            {0}, array{1}, point({2}, {3}), {4}
        );""".format(
            clusters_data[data]['label'],
            dbify_vector(clusters_data[data]['centre']), 
            two_dim_dict[clusters_data[data]['label']][0], 
            two_dim_dict[clusters_data[data]['label']][1], 
            clusters_data[data]['services_count']))
    data = []
    for i in range(len(labels)):
        data.append([int(labels[i]), index_to_ID[i]])
    model.execute_many(queries.assign_clusters_to_vectors, data)


def recluster(n_clusters=250):
    assign_clusters(n_clusters)
    assign_clusters_to_taxonomies()
