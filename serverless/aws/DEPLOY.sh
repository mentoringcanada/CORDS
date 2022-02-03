# This file will deploy all of the functions by iterating across the repository and running: pip3 install -r requirements.txt -t "folder name"
# and then zip and deploy as necessary

# This file installs the dependencies in each folder so that the app can use them with relative imports when deployed

# Installing dependencies for search
cd routes/search
pip3 install -r requirements.txt -t ../dependencies/python
cd ../dependencies/python
rm -rf *dist-info __pycache__