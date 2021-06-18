import os
import psycopg2
import tensorflow_hub as hub
import tensorflow_text


def dbify_vector(vector):
    smaller_vector = []
    for element in vector:
        smaller_vector.append(float(element))

    return smaller_vector


def load_model():
    print('loading model')
    return hub.load("./model-directory/")


def fill_missing_vector_descriptions(psql_connection_string):
    model = load_model()
    connection = psycopg2.connect(psql_connection_string)
    cursor = connection.cursor()
    cursor.execute("""SELECT resource_agency_number,
    data_partner_id,
    public_name,
    resource_description
    FROM resources
    WHERE description_vector IS NULL;""")
    items = cursor.fetchall()

    for item in items:
        text = item[-2] + ' ' + item[-1]
        vector = model([text])[0]
        cursor.execute("""UPDATE resources
        SET description_vector = array{0}
        WHERE resource_agency_number = '{1}';""".format(
            dbify_vector(vector),
            item[0]
        ))
        connection.commit()


if __name__ == '__main__':
    print('executing script')
    psql_connection_string = os.environ['PSQL_CONNECT_STR']
    fill_missing_vector_descriptions(psql_connection_string)
