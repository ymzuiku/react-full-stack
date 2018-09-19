const fs = require('fs-extra');
const { resolve } = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const helmet = require('koa-helmet');
const cors = require('@koa/cors');
const compress = require('koa-compress');
const koaJwt = require('koa-jwt');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const Mock = require('mockjs');
const isDev = process.env.deploy === undefined;

try {
  var db = new Sequelize('test', 'root', '111Asd', {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: { charset: 'utf8mb4' },
    pool: { max: 30, min: 0, acquire: 30000, idle: 10000 },
  });
  db.authenticate();
} catch (err) {
  console.warn('[react-full-stack]: No have mysql!');
}

const app = new Koa();
app.use(
  cors({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Max-Age': 43200 }),
);
app.use(compress({ threshold: 2048 }));
app.use(helmet());
app.use(bodyParser({ enableTypes: ['json', 'form'] }));
app.use(
  koaJwt({ secret: '123abc' }).unless({ path: [/^nojwt/g], method: 'GET' }),
);

const router = new Router();
function loadRouterDir(dir) {
  const stat = fs.lstatSync(dir);
  if (stat && stat.isDirectory()) {
    const files = fs.readdirSync(dir);
    for (let i = 0; i < files.length; i++) {
      if (files[i].indexOf('.js') > -1) {
        const routerFn = require(resolve(dir, files[i]));
        routerFn(router, db);
      }
    }
  }
}
loadRouterDir(resolve(__dirname, 'routers'));
app.use(router.routes());
app.use(router.allowedMethods());

const port = parseInt(process.env.port, 10) || 4000;
app.listen(port, () => console.log('http://127.0.0.1:' + port));
