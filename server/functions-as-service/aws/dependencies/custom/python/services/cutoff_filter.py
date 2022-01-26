def filter_indexes_by_cutoff(indexes, distances, cutoff, number_of_results):
    filtered_indexes = []
    c = 0
    while c < min(number_of_results, len(indexes)):
        if distances[c] < cutoff:
            filtered_indexes.append(indexes[c])
        c += 1
    return filtered_indexes
