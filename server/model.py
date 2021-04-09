import os
import pandas
import psycopg2
from psycopg2.extras import RealDictCursor


PSQL_CONNECT_STR = os.environ.get('PSQL_CONNECT_STR')
GTA_SERVICES_FILENAME = './GTA_211_Services.csv'


def execute(sql, params):
    connection = psycopg2.connect(PSQL_CONNECT_STR, cursor_factory=RealDictCursor)
    cursor = connection.cursor()
    cursor.execute(sql, params)
    return cursor.fetchall()


def get_gta_services_csv():
    data = pandas.read_csv(GTA_SERVICES_FILENAME)
    return data.fillna('')


def write_data_to_file(data, filename):
    f = open(filename, 'a')
    for line in data:
        str_line = ','.join([str(l) for l in line])
        f.write(str_line + '\n')
    
    f.close()


def store_pair(session_token, item_id):
    ...