#!/bin/bash
sudo npm install
sudo npm rebuild node-sass
sudo kill -9 $(ps aux | grep ionic_server | awk '{print $2}')
node_modules/istanbul/lib/cli.js cover --report cobertura node_modules/mocha/bin/_mocha test/test.js
karma start
sudo mv ./coverage/cobertura-coverage.xml ./build/reports/coverage/
python3 json_parser.py
state="`cat output.txt`"
if [ "$state" == "failed" ]
then
        echo "You have failed test cases. Build terminated"
        forever start www/ionic_server.js
        exit
else
        echo "Tests successful. Proceeding with build"
        forever start www/ionic_server.js
fi
