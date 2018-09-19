// next.config.js
const withSass = require('@zeit/next-sass')
module.exports = withSass({
  pageExtensions: ['js'],
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  }
})