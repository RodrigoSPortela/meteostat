const { IterationLocations } = require('./meteostat_api');
const { pois } = require('./bigquery');


exports.handler = async (req) => {

  try {

    console.log('starting');
    const longlats_array = await pois();

    console.log(`list of pois: `, longlats_array);
    console.log("--------")
    const rrr = await IterationLocations(longlats_array);
    console.log("###");
    console.log(rrr);
    console.log("###");

  }
  catch(err){
    console.log(err);
  }

}


// const { BigQuery } = require("@google-cloud/bigquery");

// create SA and grant permission to pois table

// BigQuery( projectId: 'dev-rportela', key )

// bigquery { BigQuery: [insert, read] }

