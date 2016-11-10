#!/bin/bash
sudo npm rebuild node-sass
karma start
python3 json_parser.py
state="`cat output.txt`"
if [ "$state" == "failed" ]
then
        echo "You have failed test cases. Build terminated"
        exit
else
        echo "Tests successful. Proceeding with build"
        ionic serve &
fi
