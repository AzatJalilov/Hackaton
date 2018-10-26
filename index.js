/**
 * Created by doga on 22/10/2016.
 */
const config = require('./resources/config.js');
const mongojs = require('mongojs');
var db = mongojs('mongodb://admin:check24@ds159188.mlab.com:59188/lunch-bot', ['restaurants'])

const googleMapsClient = require('@google/maps').createClient({
  key: config.googleApi.key,
  Promise: Promise
});


//
const Router = require('koa-router');
const Koa = require('koa');

const googleApi = require('./src/fetch.js');

const app = new Koa();
const router = new Router();

router.get('/lucky', async (ctx, next) => {
  const queryString = (ctx.request.query && ctx.request.query.qs) ? ctx.request.query.qs : "fast food"
  let result = await googleApi(queryString);
  let coordinatesArr = [];
  result.json.results.forEach((eachLoc) => {
    coordinatesArr.push(eachLoc.place_id)
  });
  for (const coordinates of coordinatesArr){
    let result =await googleMapsClient.place({
      placeid: coordinates,
    }).asPromise()

    db.restaurants.insert({...result.json.result})
  }

  ctx.status = 200;
  ctx.body = result.json.results;
  next()
});


router.get('/add', async (ctx, next) => {
  let id = "504efb0625aa227d084aaa1d8bd79e1d2f38764e";
  const result = await  googleMapsClient.place({
    placeid: 'ChIJ3cCEYmLfnUcRXCIPN8bEkFU',
  })
    .asPromise()
    .then(function (response) {
      console.log(response)
      return response
    }).catch((e) => {
      console.log(e)
    });

  ctx.status = 200;
  ctx.body = result;
  next()
});


app.listen(3111);

app
  .use(router.routes())
  .use(router.allowedMethods());