import model
import startup
lines = open('./data/referrals.csv', 'r').read().split('\n')
entries = []
for line in lines:
    data = line.split(',')
    entries.append(
        [data[0], ''.join(data[1:])]
    )


del lines
entries.pop(0)
print('read')


print('loaded startup')

app_state, vector_model = startup.load()

for idx in range(len(entries)):
    vector = vector_model(entries[idx][1])
    vector = startup.np.asarray([startup.np.asarray(vector[0])])
    dist, _id = app_state.cache.search(vector, 1)
    closest_id = _id[0][0]
    service_id = app_state.index_to_ID[closest_id]
    entries[idx].append(service_id)


model.execute(
    "CREATE TABLE IF NOT EXISTS referrals (referral_id varchar, service_id varchar, cluster_id int);")

for entry in entries:
    model.execute("INSERT INTO referrals (referral_id, service_id) VALUES ('{0}', '{1}');".format(
        entry[0], entry[2]))
