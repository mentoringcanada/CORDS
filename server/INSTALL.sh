#!/bin/bash

apt install python3-pip uvicorn
pip3 install -r requirements.txt
mkdir model-directory
cd model-directory
wget -O model.tar.gz https://tfhub.dev/google/universal-sentence-encoder-multilingual-large/3?tf-hub-format=compressed
tar -xf model.tar.gz
rm -f model.tar.gz
cd ..
chmod -R 777 model-directory

sudo apt install postgresql-server
