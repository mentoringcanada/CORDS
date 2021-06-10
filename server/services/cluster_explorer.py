import queries
import model


def get_all_clusters():
    return model.execute(queries.get_clusters_data)


def get_cluster(cluster_id):
    cluster_row = model.execute(queries.get_cluster_data, (cluster_id,))
    items = model.execute(queries.get_all_items_from_cluster, (cluster_id,))
    return {
        "cluster": cluster_row,
        "items": items,
    }
