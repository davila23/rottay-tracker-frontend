#!/bin/bash
rm -rf zombieman &&
git clone git@github.com:cargopanel/zombieman.git &&
cd zombieman &&
yarn &&
yarn run start &&
cp locations.json ../src &&
cd .. &&
rm -rf zombieman &&
mv src/locations.json src/temp.json &&
node --max-old-space-size=4096 node_modules/.bin/prettier-standard src/temp.json > /dev/null &&
mv src/temp.json src/locations.json
