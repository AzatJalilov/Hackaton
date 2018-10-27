const config = require('../resources/config.js');

const googleMapsClient = require('@google/maps').createClient({
  key: config.googleApi.key,
  rate: {limit: 50},
  Promise: Promise
});
async function getPlacesList(query, nextPageToken) {
  const options = {
    query: query,
    location: [config.googleApi.locationAlt, config.googleApi.locationLet],
    radius: 1000,
    minprice: 0,
    maxprice:4,
    type: 'restaurant'
  };
  if(nextPageToken && nextPageToken.token) {
    options.pagetoken = nextPageToken.token;
  }
  const places = await googleMapsClient.places(options).asPromise();
  console.log(places);
  return { restaurants : places.json.results, token: places.json.next_page_token };
}
async function getPlaceDetail(placeId) {
  const placeDetailResponse = await googleMapsClient.place({ placeid: placeId }).asPromise();
  return placeDetailResponse.json.results;
}

module.exports = { getPlacesList, getPlaceDetail };