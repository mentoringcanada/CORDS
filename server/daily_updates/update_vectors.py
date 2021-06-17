import html2text
import os
import psycopg2
import tensorflow_hub as hub
import tensorflow_text


def dbify_vector(vector):
    smaller_vector = []
    for element in vector:
        smaller_vector.append(float(element))
    return smaller_vector


def convert2text(html):
    h = html2text.HTML2Text()
    h.ignore_links = True
    h.emphasis = False
    output = h.handle(html)
    return output.replace('\n', ' ')


def load_model():
    print('loading model')
    return hub.load("./model-directory/")


def fill_outdated_vector_descriptions(psql_connection_string):
    model = load_model()
    connection = psycopg2.connect(psql_connection_string)
    cursor = connection.cursor()
    cursor.execute("""SELECT resource_agency_number,
    data_partner_id,
    public_name,
    nom_publique,
    resource_description,
    description_francais
    FROM resources
    WHERE description_updated > vectors_updated OR description_vector IS NULL;""")
    items = cursor.fetchall()

    for item in items:
        text = (item[2] or '') + ' ' + \
            (item[3] or '') + ' ' + \
            (item[4] or '') + ' ' + \
            (item[5] or '')
        text = convert2text(text)
        vector = model([text])[0]
        cursor.execute("""UPDATE resources
        SET description_vector = array{0},
        vectors_updated = NOW()
        WHERE resource_agency_number = '{1}' and data_partner_id = {2};""".format(
            dbify_vector(vector),
            item[0],
            item[1]
        ))
        connection.commit()


if __name__ == '__main__':
    print('executing script')
    psql_connection_string = os.environ['PSQL_CONNECT_STR']
    fill_outdated_vector_descriptions(psql_connection_string)
