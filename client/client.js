const next = require('next');
const Koa = require('koa');
const Router = require('koa-router');
const helmet = require('koa-helmet');
const compress = require('koa-compress');

const isDev = process.env.deploy === undefined;
const nextApp = next({ dev: isDev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = new Koa();
  app.use(compress({ threshold: 2048 }));
  app.use(helmet());

  const router = new Router();
  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  const port = parseInt(process.env.port, 10) || 4001;
  app.listen(port, () => console.log('http://127.0.0.1:' + port));
});
