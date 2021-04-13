import os
import pandas
from uuid import uuid4
# import psycopg2
# from psycopg2.extras import RealDictCursor


# PSQL_CONNECT_STR = os.environ.get('PSQL_CONNECT_STR')
GTA_SERVICES_FILENAME = './GTA_211_Services.csv'
IP_to_session = {}
session_to_IP = {}

# def execute(sql, params):
#     connection = psycopg2.connect(PSQL_CONNECT_STR, cursor_factory=RealDictCursor)
#     cursor = connection.cursor()
#     cursor.execute(sql, params)
#     return cursor.fetchall()


def get_gta_services_csv():
    data = pandas.read_csv(GTA_SERVICES_FILENAME)
    return data.fillna('')


def write_data_to_file(data, filename):
    f = open(filename, 'a')
    for line in data:
        str_line = ','.join([str(l) for l in line])
        f.write(str_line + '\n')

    f.close()


def check_session_pair(client_host):
    if client_host in IP_to_session:
        session_token = IP_to_session[client_host]
    else:
        session_token = str(uuid4)
        IP_to_session[client_host] = session_to_IP
        session_to_IP[session_token] = client_host

    return session_token


def store_pair(session_token, item_id):
    if session_token:
        f = open('pairs.csv', 'a')
        f.write(session_token + ',' + item_id)
        f.close()


def store_link_out(link_out, session_token):
    f = open('link_out.csv', 'a')
    f.write(session_token + ',' + link_out)


def update_ip(client_host, session_token):
    if session_token in session_to_IP:
        if session_to_IP[session_token] != client_host:
            session_to_IP[session_token] = client_host
            IP_to_session[client_host] = session_to_IP


def get_accepted_origins():
    return [
        "http://cordsconnect.ca:5000",
    ]
