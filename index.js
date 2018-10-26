/**
 * Created by doga on 22/10/2016.
 */

const slackService = require('./services/slack-service');
const recommendationService = require('./services/recommendation-service');
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBO7-7iiJAhph0kVbJ9wp4N95t1PBRVVUU'
});
const mongoose = require('mongoose');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaApp = new Koa();
koaApp.use(bodyParser());
koaApp.use(async (ctx, next) => {
  ctx.status = 200;
  const parsedRequest = slackService.parseSlackRequest(ctx);
  ctx.body = slackService.createImmediateResponse(parsedRequest);
  next();
  const recommended = await recommendationService.findAPlace();
  const recommendedPlaceResponse = slackService.formatResponse(recommended, parsedRequest);
  slackService.sendDelayedResponse(parsedRequest.responseUrl,recommendedPlaceResponse);
});
var port = process.env.PORT || 3111;

koaApp.listen(port);
