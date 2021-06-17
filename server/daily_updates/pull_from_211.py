from datetime import date, datetime, timedelta
import model_211 as model
import os
import requests
import queries_211 as queries


PAGE_SIZE = 1000


def get_page(lang, page, API_KEY):
    url = "https://data.211support.org/api/v2/search?key="
    data = {
        "Dataset": "on",
        "Lang": lang,
        "updatedOn": (datetime.today() - timedelta(days=2)).strftime('%Y-%m-%d'),
        "SearchType": "coverage",
        "Search": "term",
        "Term": "*",
        "Latitude": 44,
        "Longitude": -80,
        "PageIndex": page,
        "PageSize": PAGE_SIZE
    }
    response = requests.post(url+API_KEY, json=data)
    return response.json()


def update_language(lang, API_Key):
    page = 0
    total = 0.1
    count = 0
    while count < total:
        results = get_page(lang, page, API_Key)
        total = int(results['RecordCount'])
        count += len(results['Records'])
        save_records(results['Records'], lang)
        page += 1


def save_records(records, lang):
    cleaned_records = [clean_record(record) for record in records]
    to_pass_to_db = []
    for record in cleaned_records:
        if record:
            try:
                data_item = []
                data_item.append(record['resource_agency_number'])
                data_item.append(record['public_name'])
                data_item.append(record['physical_address'].replace("'", '"'))
                data_item.append(record['Latitude'])
                data_item.append(record['Longitude'])
                data_item.append(record['description'])
                data_item.append(record['link'])
                data_item.append(record['phone'])
                to_pass_to_db.append(data_item)
            except Exception as e:
                print(e, record)
    if lang == 'en':
        query = queries.insert_resource_descriptions_en
    else:
        query = queries.insert_resource_descriptions_fr
    print('inserting...')
    broken = model.execute_many(query, to_pass_to_db)
    print('inserted')
    updates = []
    missed_IDs = set([b[0] for b in broken])
    print('catching updates')
    for record in to_pass_to_db:
        if record[0] in missed_IDs:
            updates.append(record)
    if lang == 'en':
        query = queries.update_resource_descriptions_en
    else:
        query = queries.update_resource_descriptions_fr
    model.execute_many(query, updates)
    print('caught updates')


def clean_record(record):
    cleaned = {}
    try:
        cleaned['resource_agency_number'] = str(record['id'])
        cleaned['description'] = record['Description'].replace("'", '"')
        cleaned['public_name'] = record['PublicName'].replace("'", '"')
        cleaned['physical_address'] = record['PhysicalAddressStreet1'] + ' ' +  \
            record['PhysicalAddressStreet2'] + ' ' + \
            record['PhysicalAddressCity'] + ' ' + \
            record['PhysicalAddressProvince'] + ' ' + \
            record['PhysicalAddressPostalCode']
        cleaned['Latitude'] = float(record['Latitude'])
        cleaned['Longitude'] = float(record['Longitude'])
        cleaned['link'] = 'https://211central.ca/record/' + str(record['id'])
        cleaned['phone'] = ''
        try:
            cleaned['phone'] = record['PhoneNumbers'][0]['Phone'].replace(
                "'", '"')
        except:
            pass
    except Exception as e:
        print(e)
        return None
    return cleaned


if __name__ == '__main__':
    global API_KEY
    API_KEY = os.environ['API_KEY_211']
    update_language('en', API_KEY)
    update_language('fr', API_KEY)
