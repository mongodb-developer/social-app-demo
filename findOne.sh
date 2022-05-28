#!/bin/bash

# 1. Data API App Id
appid="<Data API App ID>"

# 2. API Key
apikey="<Data API Key>"

# 3. Base URL
baseurl="https://data.mongodb-api.com/app/$appid/endpoint/data/v1"

# 4. Endpoint
endpoint="/action/findOne"

# 5. dataSource
dataSource="Cluster0"

# 6. database
database="social_butterfly"

# 7. collection
collection="flutters"

# 8. filter
filter='{}'
# filter='{
#   "body": {
#     "$regex": "dad-a-base", 
#     "$options": "i"
#   } 
# }'

# 9. Run the curl request from the terminal: ./findOne.sh
curl -XPOST -H "api-key: $apikey" -H 'Access-Control-Request-Headers: *' -H 'Content-type: application/json' -d '{ 
  "dataSource": "'"$dataSource"'", 
  "database": "'"$database"'", 
  "collection": "'"$collection"'",
  "filter": '"$filter"'
}' $baseurl$endpoint | npx json