const config = require('../resources/config.js');

const googleMapsClient = require('@google/maps').createClient({
  key: config.googleApi.key,
  Promise: Promise
});

async function getPlacesList(query) {
  const places = await googleMapsClient.places({
      query: query,
      location: [config.googleApi.locationAlt, config.googleApi.locationLet],
      radius: 1000,
      minprice: 0,
      maxprice:4,
      type: 'restaurant'
    }).asPromise();
    console.log(places);
    return places.json.results;
}

module.exports = { getPlacesList };