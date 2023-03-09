ok - Get pois location (long lat)
ok - call nearby stations api (by poi) to get the list of stations ids
ok - dedup list of stations ids
ok - call daily api base on deduped list of stations ids (each day - previous day)
ok - function will run once a day and we have to setup the previous day as parameter
ok - get station metadata and join with readings
ok - store on BQ
ok - handling error (if API issue (undefined)?) - not needed to add this handler now
ok - getting metadata of nearby stations (get long lat)
- run daily
	
add the env. variables
add permission to SA to deploy
deploy the function
create the cloud scheduler
