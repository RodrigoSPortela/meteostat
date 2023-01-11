const axios = require("axios");
const { sleep } = require("./utils");

const httprequest = async (options) => {

  return await axios.request(options).then(async function (response) {

    await sleep(1000);
    if(options.url === 'https://meteostat.p.rapidapi.com/stations/nearby') {

      return response.data.data[0].id;

    }
    else{

      return response.data.data;

    }
 
  }).catch(function (error) {

    console.error(error);

  });

}

const IterationLocations = async (array_loc) => {

  let nearbyStations = [];

  for(const loc of array_loc) {

    nearbyStations.push(await NearbyWeatherStations(loc.lat, loc.long));

  }

  // returning already deduped stations
  const dedup = new Set(nearbyStations);

  return [...dedup]

}

const NearbyWeatherStations = (lat, lon) => {

  const optionsNearbyWeatherStations = {
    method: 'GET',
    url: 'https://meteostat.p.rapidapi.com/stations/nearby',
    params: {lat, lon, limit: 1, radius: 100000},
    headers: {
      'X-RapidAPI-Key': 'a06d8fff63mshbf8455691f9e5fbp162a9fjsn0f44506367f4',
      'X-RapidAPI-Host': 'meteostat.p.rapidapi.com'
    }
  };

  return httprequest(optionsNearbyWeatherStations);

}

const IterationStations = async (stationsId, startDate, endDate) => {

  let result = [];

  for(const station of stationsId) {

    result.push(await WeatherData(station, startDate, endDate));

  }

  return result;


}

const WeatherData = (stationId, startDate, endDate) => {

  const optionsWeatherData = {
    method: 'GET',
    url: 'https://meteostat.p.rapidapi.com/stations/daily',
    params: {station: stationId, start: startDate, end: endDate},
    headers: {
      'X-RapidAPI-Key': 'a06d8fff63mshbf8455691f9e5fbp162a9fjsn0f44506367f4',
      'X-RapidAPI-Host': 'meteostat.p.rapidapi.com'
    }
  };

  return httprequest(optionsWeatherData);

}
// const options = {
//   method: 'GET',
//   url: 'https://meteostat.p.rapidapi.com/stations/daily',
//   params: {station: '10637', start: '2020-01-01', end: '2020-01-01', tz: 'Europe/Berlin'},
//   headers: {
//     'X-RapidAPI-Key': 'a06d8fff63mshbf8455691f9e5fbp162a9fjsn0f44506367f4',
//     'X-RapidAPI-Host': 'meteostat.p.rapidapi.com'
//   }
// };





module.exports = {

  NearbyWeatherStations,
  IterationLocations,
  IterationStations

};
