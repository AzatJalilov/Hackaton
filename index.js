/**
 * Created by doga on 22/10/2016.
 */
const bodyParser = require('koa-bodyparser');
const restaurantsStore = require('./stores/restaurants-store');
const slackService = require('./services/slack-service');
const recommendationService = require('./services/recommendation-service');
const Router = require('koa-router');
const Koa = require('koa');
const { getPlacesList } = require('./services/google-maps-service.js');
const mapRestaurant = require('./services/restaurant-mapper');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app
  .use(router.routes())
  .use(router.allowedMethods());

router.get('/lucky', async (ctx, next) => {
  const queryString = (ctx.request.query && ctx.request.query.qs) ? ctx.request.query.qs : "fast food"
  let restaurants = await getPlacesList(queryString);
  restaurants.forEach(restaurant => restaurantsStore.insertRestaurants(mapRestaurant(restaurant)));
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
