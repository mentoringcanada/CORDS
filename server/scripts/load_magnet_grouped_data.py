import model
import csv


# /d on referrals
# referral_id  | service_id | cluster_id 


# head -n 1 on MatchesData.csv
# "posting_id","individual_id"


data_dicts = []
with open('MatchesData.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        data_dicts.append([
            row['posting_id'],
            row['individual_id']
        ])


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
                service_id,
                referral_id
            )
    ) ON CONFLICT DO NOTHING;
"""


# print(data_dicts[0])
model.execute_many(insert_grouped_data, data_dicts)