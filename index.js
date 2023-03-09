// const { BigQuery } = require('@google-cloud/bigquery');
require('dotenv').config();
const { IterationLocations, IterationStations, WeatherMetaData } = require('./meteostat_api');
const { pois, bqIngestion } = require('./bigquery');
const moment = require('moment');



exports.handler = async (req) => {

  try {

    console.log(process.env);

    const previousDay = moment().utc().subtract(1, 'day').format("YYYY-MM-DD");

    console.log('starting');
    const longlats_array = await pois();

    console.log(`list of pois: `, longlats_array);
    console.log("--------")
    const nearbyStations = await IterationLocations(longlats_array);

    console.log("nearbyStations___");
    console.log(nearbyStations);

    const result = await IterationStations(nearbyStations, previousDay)

    console.log("result___");    
    console.log(result);

    console.log("ingeting on bq");
    await bqIngestion(result);
    

  }
  catch(err){
    console.log(err);
    throw Error(err);
  }

}


// const { BigQuery } = require("@google-cloud/bigquery");

// create SA and grant permission to pois table

// BigQuery( projectId: 'dev-rportela', key )

// bigquery { BigQuery: [insert, read] }

