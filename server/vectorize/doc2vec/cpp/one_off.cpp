#include <limits>
#include <stdarg.h>
#include "Doc2Vec.h"
#include "WMD.h"
#include "TaggedBrownCorpus.h"
#include "TrainModelThread.h"
#include "common_define.h"
#include <iostream>
using namespace std;

int main(int argc, char *argv[])
{
    Doc2Vec model;
    FILE *fin = fopen("./model_biling.sg", "rb");
    model.load(fin);
    fclose(fin);

    TaggedDocument doc;
    doc.m_word_num = argc - 1;
    int idx = 1;
    char **words = (char **)calloc(MAX_SENTENCE_LENGTH, sizeof(char*));

    while (idx <= doc.m_word_num)
    {
        words[idx-1] = argv[idx];
        idx++;
    }
    real * infer_vector = NULL;
    posix_memalign((void **)&infer_vector, 128, 100 * sizeof(real));

    model.infer_doc(&doc, infer_vector);
    for (int i = 0; i < 100; i++) cout << infer_vector[i] << ',';
    return 0;
}
