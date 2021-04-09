from helper_classes import result
import model
import numpy as np
from services import cache
from services import converters
from services import nlp_model


def load():
    print('loading NLP model')
    vector_model = nlp_model.load_model()

    print('loading GTA services')
    GTA_Services = model.get_gta_services_csv()

    print('parsing services into accessible list')
    items_list = []
    for _, row in GTA_Services.iterrows():
        try:
            description = converters.convert2text(
                row['AgencyDescription'])
            item = result.Item(
                name=row['PublicName'],
                description=description,
                item_id=str(row['ResourceAgencyNum']),
                lat=float(row['Latitude']),
                lng=float(row['Longitude']),
                address=row['PhysicalAddress1'] + ', ' + row['PhysicalCity']
            )
            items_list.append(item)
        except Exception as e:
            print(e)

    print('vectorizing and indexing services')
    items_dict = {}
    vectors = []
    item_IDs = []
    while True:
        try:
            item = items_list.pop()
            items_dict[item.item_id] = item
            vector = vector_model(item.description)
            vector = np.asarray(vector[0])
            vectors.append(vector)
            item_IDs.append(item.item_id)
        except:
            break

    del items_list

    print('services in cache')
    cache.load_index()
    vectors = np.asarray(vectors)
    print(vectors.shape)
    cache.add_vectors(vectors)

    app_state = result.AppState(
        items=items_dict,
        index_to_ID=item_IDs,
        cache=cache.index
    )

    print('loaded')
    return app_state, vector_model
