import os
import psycopg2
from psycopg2.extras import RealDictCursor
from psycopg2.extras import execute_values


PSQL_CONNECT_STR = os.environ.get('PSQL_CONNECT_STR')


def execute(sql, params=()):
    connection = psycopg2.connect(
        PSQL_CONNECT_STR, cursor_factory=RealDictCursor)
    cursor = connection.cursor()
    cursor.execute(sql, params)
    connection.commit()
    try:
        return cursor.fetchall()
    except:
        return []


def execute_many(sql, data):
    connection = psycopg2.connect(
        PSQL_CONNECT_STR)
    cursor = connection.cursor()
    execute_values(cursor, sql, data, page_size=500)
    connection.commit()
    try:
        return cursor.fetchall()
    except:
        return []
