const config = require('../resources/config.js');

const googleMapsClient = require('@google/maps').createClient({
  key: config.googleApi.key,
  Promise: Promise
});


function fetchFromGoogle(query) {
  return new Promise(async resolve => {
    const result = await googleMapsClient.places({
      query: query, //
      location: [config.googleApi.locationAlt, config.googleApi.locationLet],
      radius: 1,
      opennow: true,
      type: 'restaurant'
    }).asPromise().catch((e) => console.log(e));
    resolve(result)
  })
}

module.exports = fetchFromGoogle;