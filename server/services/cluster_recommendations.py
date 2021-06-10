import model
import queries


def get_all_taxonomies():
    return model.execute(queries.get_popular_taxonomies)


def get_cluster_recommendations_from_taxonomies(item_IDs):
    taxonomy_clusters = model.execute(
        queries.get_applicable_clusters_to_taxonomy, (item_IDs,))
    existing_clusters = [x['cluster_id'] for x in taxonomy_clusters]
    cluster_recommendations = model.execute(
        queries.get_cluster_recommendations, (existing_clusters,))
    cluster_ids = [row['cluster_id'] for row in cluster_recommendations]
    return cluster_ids
