/**
 * Created by doga on 22/10/2016.
 */
const config = require('./resources/config.js');
const mongojs = require('mongojs');
var db = mongojs('mongodb://admin:check24@ds159188.mlab.com:59188/lunch-bot', ['restaurants'])
const bodyParser = require('koa-bodyparser');

const slackService = require('./services/slack-service');
const recommendationService = require('./services/recommendation-service');
const googleMapsClient = require('@google/maps').createClient({
  key: config.googleApi.key,
  Promise: Promise
});
const Router = require('koa-router');
const Koa = require('koa');

const googleApi = require('./services/fetch.js');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app
  .use(router.routes())
  .use(router.allowedMethods());

router.get('/lucky', async (ctx, next) => {
  const queryString = (ctx.request.query && ctx.request.query.qs) ? ctx.request.query.qs : "fast food"
  let result = await googleApi(queryString);
  let coordinatesArr = [];
  result.json.results.forEach((eachLoc) => {
    coordinatesArr.push(eachLoc.place_id)
  });
  for (const coordinates of coordinatesArr) {
    let result = await googleMapsClient.place({
      placeid: coordinates,
    }).asPromise()

    db.restaurants.insert({ ...result.json.result })
  }
  ctx.status = 200;
  next()
});

router.post('/', async (ctx, next) => {
  ctx.status = 200;
  const parsedRequest = slackService.parseSlackRequest(ctx);
  ctx.body = slackService.createImmediateResponse(parsedRequest);
  next();
  recommendationService.findAPlace()
    .then(recommendedPlaceResponse => {
      const messageBody = slackService.formatResponse(recommendedPlaceResponse, parsedRequest);
      slackService.sendDelayedResponse(parsedRequest.responseUrl, messageBody);
    });
});
var port = process.env.PORT || 3111;

app.listen(port);
