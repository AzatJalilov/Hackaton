/**
 * Created by doga on 22/10/2016.
 */
const bodyParser = require('koa-bodyparser');
const slackService = require('./services/slack-service');
const recommendationService = require('./services/recommendation-service');
const Router = require('koa-router');
const Koa = require('koa');
const { getPlacesList, getPlaceDetail } = require('./services/google-maps-service.js');
const restaurantsStore = require('./stores/restaurants-store');
const mapRestaurant = require('./services/restaurant-mapper');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app
  .use(router.routes())
  .use(router.allowedMethods());

router.get('/lucky', async (ctx, next) => {
  const queryString = (ctx.request.query && ctx.request.query.qs) ? ctx.request.query.qs : "fast food";
  restaurantsStore.getToken().then(async (nextToken) => {
    let { restaurants, token } = await getPlacesList(queryString, nextToken);
    restaurants.forEach(restaurant => restaurantsStore.insertRestaurants(mapRestaurant(restaurant)));
    restaurantsStore.saveToken(token);
  });
  ctx.status = 200;
  next();
});

router.get('/fillmeup', async (ctx, next) => {
  let isRunning;
  restaurantsStore.getRestaurants()
    .then((restaurants) => 
      restaurants.forEach(async (currentRestaurant) => {
        if (!currentRestaurant.url && !isRunning) {
          let success;
          isRunning = true;
          while (!success){
            try{
              console.log(`Trying to get details for ${currentRestaurant.placeId}`);
              const restaurantDetail = await getPlaceDetail(currentRestaurant.placeId);
              console.log(`Recieved details ${restaurantDetail}`);
              restaurantsStore.updateRestaurantDetails(mapRestaurant(restaurantDetail));
              success = true;
            }
            catch (ex) {
              console.log('Unsuccessfull');
            }
          }
        }
      })
  );
  ctx.status = 200;
  next()
});

router.post('/', async (ctx, next) => {
  ctx.status = 200;
  const parsedRequest = slackService.parseSlackRequest(ctx);
  ctx.body = slackService.createImmediateResponse(parsedRequest);
  next();
  recommendationService.findAPlace(parsedRequest.payload)
    .then(recommendedPlaceResponse => {
      const messageBody = slackService.formatResponse(recommendedPlaceResponse, parsedRequest);
      slackService.sendDelayedResponse(parsedRequest.responseUrl, messageBody);
    });
});
var port = process.env.PORT || 3111;

app.listen(port);
