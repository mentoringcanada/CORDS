import csv
import os
import psycopg2


psql_connection_string = os.environ.get('PSQL_CONNECT_STR')


def read_csv():
    f = open('./GTA_211_Services.csv', 'r')
    reader = csv.DictReader(f)
    data_line = next(reader, None)
    while data_line:
        insert_service(data_line)
        data_line = next(reader, None)
    print('done')


def insert_service(service):
    geocoordinates = (float(service['Latitude']), float(service['Longitude']))

    if service['PhysicalAddressIsPrivate'] != 'No':
        address = service['PhysicalAddress1'] + \
            ' ' + service['PhysicalAddress1'] + ' ' + \
            service['PhysicalCity'] + ' ' + \
            service['PhysicalCounty'] + ' ' + \
            service['PhysicalStateProvince'] + ' ' + \
            service['PhysicalPostalCode'] + ' '
    else:
        address = 'Private'

    connection = psycopg2.connect(psql_connection_string)
    cursor = connection.cursor()
    cursor.execute("""INSERT INTO resources (
        resource_agency_number,
        public_name,
        physical_address,
        geocoordinates,
        resource_description
    )
    VALUES (
        '{0}', '{1}', '{2}', point({3}, {4}), '{5}'
    );""".format(
        service['ResourceAgencyNum'].replace("'", ""),
        service['PublicName'].replace("'", ""),
        address.replace("'", ""),
        geocoordinates[0],
        geocoordinates[1],
        service['AgencyDescription'].replace("'", ""),
    ))
    connection.commit()


if __name__ == '__main__':
    read_csv()
