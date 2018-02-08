#!/usr/bin/env bash
set -e

 function cleanup {
    docker-compose down
}
trap cleanup EXIT

yarn build
docker-compose build
docker-compose up -d
./wait-for-it.sh localhost:28017 -- echo "DB is up"
docker-compose exec -T db mongo --eval "db.getMongo().getDB('darbobirza').users.save({ _id: '8e1402e5-39f3-45fc-90cf-dd0dc8567f9d', name: 'admin', password: 'labas', login: 'admin', claims: [{ name: 'role', value: 'Administrator' }]})"
./wait-for-it.sh localhost:5555 -- echo "API is up"
node ./selenium.js
