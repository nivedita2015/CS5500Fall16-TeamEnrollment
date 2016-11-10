import json
import os
from pprint import pprint

text_file = open("output.txt", "w+")
with open('karma-result.json') as data_file:
    data = json.load(data_file)
for x in  data["results"]:
        if not(x["success"]):
                text_file.write("failed")
                text_file.close()
                exit()
text_file.write("success")
text_file.close()
