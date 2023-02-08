const { BigQuery } = require('@google-cloud/bigquery');
const path = require('path');

const keyFile = path.resolve(__dirname, 'gcp-key.json')

const bigquery = new BigQuery({ projectId: 'semios-bq-stage', keyFile });


async function pois() {

  const query = `
  WITH first AS (
    SELECT 
      DISTINCT ST_X(ST_GEOGFROM(lnglat_text)) AS long,
      ST_Y(ST_GEOGFROMTEXT(lnglat_text)) AS lat
    FROM \`semios-data-platform.prod_21_10_ag.semios_measurements_precipitation_conditioned\`
    WHERE DATE(stamp) >= DATE(CURRENT_TIMESTAMP()) - 1
    LIMIT 2
  ),
  second AS (

    SELECT 
    DISTINCT ST_X(ST_GEOGFROM(lnglat_text)) AS long,
    ST_Y(ST_GEOGFROMTEXT(lnglat_text)) AS lat
    FROM \`semios-data-platform.prod_21_10_ag.semios_measurements_precipitation_conditioned\`
    WHERE DATE(stamp) >= DATE(CURRENT_TIMESTAMP()) - 1
    LIMIT 2

  )
  SELECT * FROM first
  UNION ALL
  SELECT * FROM second
  `

  const options = {query, location: 'US'};

  const [result] = await bigquery.query(options);

  return result;

}

const bqIngestion = async (payload) => {

  try{

    await bigquery
    .dataset('dev_arisa')
    .table('meteostat')
    .insert(payload);

  }
  catch(err){

    console.log(JSON.stringify(err));
    throw new Error(`BQ could not ingest data because of error: ${err}`);

  }

}


module.exports = {

  pois,
  bqIngestion

};
