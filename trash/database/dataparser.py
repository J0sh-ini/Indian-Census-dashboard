# Filename: group_by_date.py

import csv
import json
from collections import defaultdict

def create_json(csv_file_path, json_file_path,json_file_path2):
    date_data = defaultdict(list)
    country_data = defaultdict(list)
    print(f"Reading ")
    try:
        with open(csv_file_path, mode='r', encoding='utf-8-sig') as csv_file:
            reader = csv.DictReader(csv_file)
            for row in reader:
                reported_date = row['Date_reported']
                date_data[reported_date].append(row)
                country_name = row['Country']
                country_data[country_name].append(row)


    except FileNotFoundError:
        print(f"'{csv_file_path}' was not found.")
        return
    except Exception as e:
        print(f"error {e}")
        return
    date_output_list = []
    for date, data_rows in date_data.items():
        date_output_list.append({date: data_rows})
    country_output_list = []
    for country, data_rows in country_data.items():
        country_output_list.append({country: data_rows})
    print(f"Writing")
    with open(json_file_path, mode='w', encoding='utf-8-sig') as json_file:
        json.dump(date_output_list, json_file, indent=2)
    with open(json_file_path2, mode='w', encoding='utf-8-sig') as json_file:
        json.dump(country_output_list, json_file, indent=2)
    print(f"Data saved.")

if __name__ == "__main__":
    input_csv = 'database/tempLarge.csv'
    output_json = 'database/date_wise_data.json'
    output_json2='database/country_wise_data.json'
    create_json(input_csv, output_json,output_json2)

