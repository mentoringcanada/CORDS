from helper_classes.other_classes.itemList import ItemList
from helper_classes.other_classes.item import Item
import queries
import model
from helper_classes.other_classes.clusterList import ClusterList
from helper_classes.other_classes.cluster import Cluster


def get_all_clusters():
    data = model.execute(queries.get_clusters_data)
    cluster_list = [Cluster.from_db_row(d)
                    for d in data]
    output = ClusterList(clusters=cluster_list)
    return output


def get_cluster(cluster_id):
    cluster_rows = model.execute(queries.get_cluster_data, (cluster_id,))
    cluster = Cluster.from_db_row(cluster_rows[0])
    items = model.execute(queries.get_all_items_from_cluster, (cluster_id,))
    item_list = [Item.from_db_row(i) for i in items]
    cluster.itemList = ItemList(items=item_list)
    return cluster
