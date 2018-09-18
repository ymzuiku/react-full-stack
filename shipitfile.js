module.exports = shipit => {
  require('shipit-deploy')(shipit);
  const appName = 'gantt';
  const remotePath = `/db/ssr/appName`;
  const currentPath = remotePath + '/current';
  shipit.initConfig({
    default: {
      deployTo: remotePath,
      repositoryUrl: 'git@gitlab.com:ymzuiku/gantt-full.git',
    },
    dev: {
      servers: ['root@120.79.150.132'],
      branch: 'master',
    },
  });
  shipit.task('copy', async () => {
    await shipit.copyToRemote('./ssh', '/db/static/public/gantt');
  });
  shipit.task('server', async () => {
    await shipit.remote(
      `cd ${currentPath}/server && yarn && {pm2 delete ${appName}-server} || {} && port=4000 deploy=1 pm2 start server.js --name=${appName}-server -i 0`,
    );
  });
  shipit.task('client', async () => {
    await shipit.remote(
      `cd ${currentPath}/client && yarn && yarn build && {pm2 delete ${appName}-client} || {} && port=80 deploy=1 pm2 start client.js --name=${appName}-client -i 0`,
    );
  });
  // 监听published事件，触发后就执行任务。
  shipit.on('published', () => {
    shipit.start(['copy', 'server', 'client']);
  });
};