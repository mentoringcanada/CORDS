#include <iostream>
#include <cstring>

using namespace std;

int main(int argc, char *argv[])
{
    int token_index = 1;
    
    char word[std::strlen(argv[token_index])]; 
    while (token_index < argc) {

        for (int i = 0; i <= std::strlen(argv[token_index]); i++)
        {
            /* Here we are performing a check so that only those 
        * characters gets converted into lowercase that are 
        * in uppercase. 
        * ASCII value of A to Z(uppercase chars) ranges from 65 to 92 
        */
            if (argv[token_index][i] >= 65 && argv[token_index][i] <= 92)
            {
                word[i] = argv[token_index][i] + 32;
            } else if (argv[token_index][i] >= 97 && argv[token_index][i] <= 122)
            {
                word[i] = argv[token_index][i];
            }
        }
        token_index++;
        cout << word << " ";
        free(word);
    }
    return 0;
}