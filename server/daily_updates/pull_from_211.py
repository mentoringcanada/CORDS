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
        "updatedOn": (datetime.today() - timedelta(days=1)).strftime('%Y-%m-%d'),
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
    if lang == 'en':
        query = queries.update_resource_description_en
    else:
        query = queries.update_resource_description_fr
    for record in cleaned_records:
        if record:
            print('updating', record['resource_agency_number'])
            try:
                model.execute(query.format(
                    record['resource_agency_number'],
                    record['public_name'],
                    record['physical_address'].replace("'", '"'),
                    record['Latitude'],
                    record['Longitude'],
                    record['description'],
                    record['link'],
                    record['phone']
                ))
            except Exception as e:
                print(e, record)


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
            cleaned['phone'] = record['PhoneNumbers'][0]['Phone'].replace("'", '"')
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
