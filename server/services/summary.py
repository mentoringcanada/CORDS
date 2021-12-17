from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.tokenize.regexp import regexp_tokenize

# initializing TF IDF
tfidfVectorizer = TfidfVectorizer(use_idf=True, max_features=50000, stop_words='english')

def get_cluster_ids(descriptions):
    # descriptions dictionary containes cluster ids as its key.
    return [k for k in descriptions]

'''
Tokenizes the sentences to words and remove all punctuations.
Also, forms one list that holds all words in all clusters.
'''
def group_cluster_texts_together(cluster_ids, descriptions):
    texts = []
    for c in cluster_ids:
        description = regexp_tokenize(descriptions[c].lower(), pattern='\s+', gaps=True)
        texts.append(' '.join(description))
    return texts

'''
This method gets the vocabulary from tfidfVectorizer 
tfidfVectorizer.vocabulary_ returns a dict of word/term (key) and the feature index of that word in the matrix (value)
We then iterate and create dictionary of index (key) to terms (value).
'''
def extract_vocabulary_from_model():
    indexes_to_terms = {}
    vocab_dict = tfidfVectorizer.vocabulary_
    for word in vocab_dict:
        indexes_to_terms[vocab_dict[word]] = word
    return indexes_to_terms

'''
For each cluster, we find the first n_terms keywords.
'''
def find_keywords_for_each_cluster(tf_idf_vector, indexes_to_terms, cluster_ids, n_terms):
    output_pairs = []
    for vec_index in range(tf_idf_vector.shape[0]):
        row = tf_idf_vector.getrow(vec_index).toarray()[0]
        row_argmaxes = row.argsort()[-n_terms:]
        key_words = []
        for word_index in row_argmaxes:
            key_words.append(indexes_to_terms[word_index])
        output_pairs.append([' '.join(key_words), cluster_ids[vec_index]])
    return output_pairs

def summaries(descriptions, n_terms=5):
    cluster_ids = get_cluster_ids(descriptions)
    texts = group_cluster_texts_together(cluster_ids, descriptions)
    # perform TF IDF
    tf_idf_vector = tfidfVectorizer.fit_transform(texts)
    indexes_to_terms = extract_vocabulary_from_model()
    output_pairs = find_keywords_for_each_cluster(tf_idf_vector, indexes_to_terms, cluster_ids, n_terms)
    return output_pairs


# op1 =  summaries({1: 'austin\'s ', 2: 'business! austin', 4: 'joyal hello', 5: 'austin joyal'})
# op2 = summaries({121: 'austining', 232: 'business is austin', 4121: 'joyal was hello', 115: 'austin for joyal'})
# print(op1 == [['business hello joyal austin', 1], ['hello joyal austin business', 2], ['austin business joyal hello', 4], ['business hello austin joyal', 5]])
# print(op2 == [['austin business hello joyal austining', 121], ['austining hello joyal austin business', 232], ['austin austining business joyal hello', 4121], ['austining business hello austin joyal', 115]])

