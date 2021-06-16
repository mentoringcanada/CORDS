from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.tokenize.regexp import regexp_tokenize


def summaries(descriptions, n_terms=5):
    tfidfVectorizer=TfidfVectorizer(use_idf=True, max_features=50000, stop_words='english')
    cluster_ids = [k for k in descriptions.keys()]
    texts = []
    for c in cluster_ids:
        description = regexp_tokenize(descriptions[c].lower(), pattern='\s+', gaps=True)
        texts.append(' '.join(description))
    tf_idf_vector = tfidfVectorizer.fit_transform(texts)
    indexes_to_terms = {}
    vocab_dict = tfidfVectorizer.vocabulary_
    for word in vocab_dict:
        indexes_to_terms[vocab_dict[word]] = word
    output_pairs = []
    for vec_index in range(tf_idf_vector.shape[0]):
        row = tf_idf_vector.getrow(vec_index).toarray()[0]
        row_argmaxes = row.argsort()[-n_terms:]
        key_words = []
        for word_index in row_argmaxes:
            key_words.append(indexes_to_terms[word_index])
        output_pairs.append([' '.join(key_words), cluster_ids[vec_index]])
    return output_pairs
