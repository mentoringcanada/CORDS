import csv
import os
import psycopg2


def read_csv():
    f = open('./GTA_211_Services.csv', 'r')
    reader = csv.DictReader(f)
    data_line = next(reader, None)
    c = 1
    while data_line:
        print(c)
        c = c+1
        fix_address(data_line)
        data_line = next(reader, None)
    print('done')


def fix_address(service):
    if len(service['AgencyDescription']) <= 5:
        return None

    address = service['PhysicalAddress1'] + \
        ' ' + service['PhysicalAddress1'] + ' ' + \
        service['PhysicalCity'] + ' ' + \
        service['PhysicalCounty'] + ' ' + \
        service['PhysicalStateProvince'] + ' ' + \
        service['PhysicalPostalCode']
    
    address = address.replace("'", '')

    phone = service['Phone1Number'].replace("'", '')
    if len(phone) == 0:
        phone = service['PhoneNumberBusinessLine'].replace("'", '')

    global psql_connection_string
    connection = psycopg2.connect(psql_connection_string)
    cursor = connection.cursor()
    cursor.execute("""UPDATE resources SET
    physical_address = '{0}',
    phone = '{1}'
    WHERE resource_agency_number = '{2}';""".format(
        address, phone, service['ResourceAgencyNum']
    ))
    connection.commit()


if __name__ == '__main__':
    psql_connection_string = os.environ['PSQL_CONNECT_STR']
    read_csv()
