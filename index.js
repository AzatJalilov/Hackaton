/**
 * Created by doga on 22/10/2016.
 */

//const config = require('./resources/config.js');

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBO7-7iiJAhph0kVbJ9wp4N95t1PBRVVUU'
});
const mongoose = require('mongoose');



const Koa = require('koa');
const koaApp = new Koa();
koaApp.use(async (ctx, next) => {


  ctx.status = 200
  ctx.body = "hello";
  next()

});
koaApp.listen(80);
