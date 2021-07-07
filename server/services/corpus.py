from gensim.corpora.textcorpus import TextCorpus
from gensim.test.utils import datapath
from gensim import utils
import model

data = model.execute("SELECT resource_description, description_francais FROM resources;")
f = open('documents.data', 'a')
c = 0
for d in data:
    c += 1
    f.write((d['resource_description'] or '') + ' ' + (d['description_francais'] or '') +  ',' + str(c) + '\n')

f.close()

class CorpusMiislita(TextCorpus):
    stopwords = set('for a of the and to in on'.split())
    def get_texts(self):
        for doc in self.getstream():
            yield [word for word in utils.to_unicode(doc).lower().split() if word not in self.stopwords]
    def __len__(self):
        self.length = sum(1 for _ in self.get_texts())
        return self.length


corpus = CorpusMiislita(datapath('/home/andrew/Codebase/cords/server/documents.data'))
corpus.save('documents.cor')

import gensim
import smart_open

def read_corpus(fname, tokens_only=False):
    with smart_open.open(fname, encoding="iso-8859-1") as f:
        for i, line in enumerate(f):
            tokens = gensim.utils.simple_preprocess(line)
            if tokens_only:
                yield tokens
            else:
                # For training data, add tags
                yield gensim.models.doc2vec.TaggedDocument(tokens, [i])

train_corpus = list(read_corpus('documents.cor'))


model = gensim.models.doc2vec.Doc2Vec(vector_size=100, min_count=2, epochs=40)

model.build_vocab(train_corpus)

model.train(train_corpus, total_examples=model.corpus_count, epochs=model.epochs)

vector = model.infer_vector(['I', 'need', 'a', 'job'])

ranks = []
second_ranks = []
for doc_id in range(len(train_corpus)):
    inferred_vector = model.infer_vector(train_corpus[doc_id].words)
    sims = model.dv.most_similar([inferred_vector], topn=5)
    rank = [docid for docid, sim in sims].index(doc_id)
    ranks.append(rank)
    second_ranks.append(sims[1])


import collections

counter = collections.Counter(ranks)

for label, index in [('MOST', 0), ('SECOND-MOST', 1), ('MEDIAN', len(sims)//2), ('LEAST', len(sims) - 1)]:
    print(u'%s %s: «%s»\n' % (label, sims[index], ' '.join(train_corpus[sims[index][0]].words)))

import random
doc_id = random.randint(0, len(train_corpus) - 1)

sim_id = second_ranks[doc_id]

doc_id = random.randint(0, len(test_corpus) - 1)
inferred_vector = model.infer_vector(test_corpus[doc_id])
sims = model.dv.most_similar([inferred_vector], topn=len(model.dv))

for label, index in [('MOST', 0), ('MEDIAN', len(sims)//2), ('LEAST', len(sims) - 1)]:
    print(u'%s %s: «%s»\n' % (label, sims[index], ' '.join(train_corpus[sims[index][0]].words)))
