const { IterationLocations } = require('./meteostat_api');
const { pois } = require('./bigquery');


exports.handler = async (req) => {

  try {

    console.log('test here');
    const longlats_array = await pois();
    console.log(longlats_array);
    const rrr = IterationLocations(longlats_array);
    console.log(rrr);

  }
  catch(err){
    console.log(err);
  }

}


// const { BigQuery } = require("@google-cloud/bigquery");

// create SA and grant permission to pois table

// BigQuery( projectId: 'dev-rportela', key )

// bigquery { BigQuery: [insert, read] }

