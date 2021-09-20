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
