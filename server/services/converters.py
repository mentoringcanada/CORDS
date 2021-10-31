import html2text
import numpy as np


def convert2text(html):
    h = html2text.HTML2Text()
    h.ignore_links = True
    h.emphasis = False
    output = h.handle(html)
    return output.replace('\n', ' ')


def textvec2vec(text_vector):
    return np.asarray(text_vector).astype(np.float32)


def items2str(indexes, index_to_ID, item_id = None):
    result_IDs = []
    if item_id:
        result_IDs.append("'" + item_id + "'")
    for index in indexes:
        item_id = index_to_ID[index]
        result_IDs.append("'" + item_id + "'")
    return result_IDs


def build_inclusion_filter(search_employment, search_volunteer, search_community_services):
    include_resource_types = " "
    if search_employment or search_volunteer or search_community_services:
        include_resource_types = " AND resource_type in ("
        types = []
        if search_employment:
            types.append("'employment'")
        if search_volunteer:
            types.append("'volunteering'")
        if search_community_services:
            types.append("'211'")
        include_resource_types += ', '.join(types) + ') '
    return include_resource_types
