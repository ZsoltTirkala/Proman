import csv
import os

dirname = os.path.dirname(__file__)


def read_csv_file(file):
    with open(file) as q:
        list_of_dicts = [{k: v for k, v in row.items()} for row in csv.DictReader(q, skipinitialspace=True)]

    for dict_item in list_of_dicts:
        for k, v in dict_item.items():
            if v.isnumeric():
                dict_item.update({k: int(v)})

    return list_of_dicts


# def write_csv_file(file, list_to_write):
#     with open(file, 'a', newline="") as csv_file:
#         csv_writer = csv.writer(csv_file, delimiter=",", quotechar='"', quoting=csv.QUOTE_MINIMAL)
#
#         csv_writer.writerow(list_to_write)


if __name__ == '__main__':
    write_csv_file(f"{dirname}/sample_data/question.csv")
