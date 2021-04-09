apt install python3-pip unzip
pip3 install -r requirements.txt
mkdir model-directory
cd model-directory
wget https://tfhub.dev/google/universal-sentence-encoder-large/5?tf-hub-format=compressed
ls | mv model.tar.gz
tar -xf model.tar.gz
