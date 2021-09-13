def filter_indexes_by_cutoff(indexes, distances, cutoff, number_of_results):
    filtered_indexes = []
    c = 0
    while c < number_of_results:
        if distances[c] < cutoff:
            filtered_indexes.append(indexes)
        c += 1
    return filtered_indexes
