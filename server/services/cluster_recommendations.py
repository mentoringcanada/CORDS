import model
import queries
from helper_classes.other_classes import taxonomyList, taxonomy

def get_all_taxonomies():
    data = model.execute(queries.get_popular_taxonomies)
    output = taxonomyList.TaxonomyList(
        taxonomies = [
            taxonomy.Taxonomy.from_db_row(row)
            for row in data
        ]
    )
    return output

def get_cluster_recommendations_from_taxonomies(item_IDs, n_recommendations=5):
    cluster_recommendations = model.execute(
        queries.get_cluster_recommendations_from_clusters, (item_IDs, n_recommendations,))
    cluster_ids = [row['cluster_id'] for row in cluster_recommendations]
    return cluster_ids
