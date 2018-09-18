module.exports = shipit => {
  require('shipit-deploy')(shipit);
  const appName = 'full-stack';
  const remotePath = `/db/ssr/${appName}`;
  const currentPath = remotePath + '/current';
  shipit.initConfig({
    default: {
      deployTo: remotePath,
      repositoryUrl: 'git@github.com:ymzuiku/react-full-stack.git',
    },
    dev: {
      servers: ['root@120.79.150.132'],
      branch: 'master',
    },
  });
  shipit.task('copy', async () => {
    await shipit.copyToRemote('./ssh', '/db/static/public/gantt');
  });
  shipit.task('prod', async () => {
    await shipit.remote(`{pm2 delete ${appName}-server} || {}`);
    await shipit.remote(
      `cd ${currentPath} && yarn && cd server && port=4000 deploy=1 pm2 start server.js --name=${appName}-server -i 0`,
    );

    await shipit.remote(`{pm2 delete ${appName}-client} || {}`);
    await shipit.remote(
      `cd ${currentPath}/client && ../node_modules/.bin/next build && port=80 deploy=1 pm2 start client.js --name=${appName}-client -i 0`,
    );
  });
  // 监听published事件，触发后就执行任务。
  shipit.on('published', () => {
    shipit.start(['copy', 'prod']);
  });
};
