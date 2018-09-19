// next.config.js
const withSass = require('@zeit/next-sass');
module.exports = withSass({
  // pageExtensions: ['js'],
  cssModules: true,
  // cssLoaderOptions: {
  //   importLoaders: 1,
  //   localIdentName: '[local]_[hash:base64:5]',
  // },
  postcssLoaderOptions: {
    parser: true,
    config: {
      ctx: {
        theme: JSON.stringify(process.env.REACT_APP_THEME),
      },
    },
  },
});
