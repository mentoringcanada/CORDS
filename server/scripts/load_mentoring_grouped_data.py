import sys
import os

current = os.path.dirname(os.path.realpath(__file__))
parent = os.path.dirname(current)
sys.path.append(parent)

import model


lines = open("inquiries-grouped-by-email.csv", "r").read().split('\n')
print(lines[-1])


# get string to python lists/dicts
pre_data = []
for line in lines:
    try:
        pre_data.append(eval(line[1:-1].replace('""','"')))
    except:
        line


# flatten lists
data = []
for line in pre_data:
    data.append([item for sublist in line for item in sublist])


# filter on length
data = [d for d in data if len(d) > 1]


from uuid import uuid4
output = []
for group in data:
    group_id = uuid4().hex
    for obj in group:
        for key in obj:
            output.append([group_id, obj[key]])


insert_grouped_data = """INSERT INTO
    referrals (
        referral_id,
        service_id
    ) (
        SELECT
            e.referral_id,
            e.service_id
        FROM
            (VALUES %s) as e(
                referral_id,
                service_id
            )
    ) ON CONFLICT DO NOTHING;
"""


model.execute_many(insert_grouped_data, output)
