const Sequelize = require('sequelize');
const Router = require('koa-router');

module.exports = function(router = new Router(), db = new Sequelize()) {
  const User = db.define('user', {
    username: { type: Sequelize.STRING, allowNull: false },
    password: { type: Sequelize.STRING, defaultValue: '123456' },
    msg: { type: Sequelize.STRING },
  });
  router.get('/nojwt/test', async ctx => {
    ctx.body = { name: 'test', age: 10 };
  });
  router.post('/api/nojwt/user/login', async ctx => {
    await User.sync();
    if (!ctx.request.body.password) {
      ctx.status = 500;
      ctx.body = { msg: 'no have password' };
      return;
    }
    let user = await User.findOne({
      where: { username: ctx.request.body.username },
    });
    if (!user) {
      user = await User.create(ctx.request.body);
      ctx.body = { msg: 'createUser', user };
    } else if (user.password === ctx.request.body.password) {
      user.msg = 'update-the-msg';
      user.save();
      ctx.body = { msg: 'login', user };
    } else {
      ctx.status = 401;
      ctx.body = { msg: 'passwordError' };
    }
  });
};
