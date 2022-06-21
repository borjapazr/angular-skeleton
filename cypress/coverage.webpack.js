module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        loader: '@skyux-sdk/istanbul-instrumenter-loader',
        options: { esModules: true },
        enforce: 'post',
        include: require('path').join(__dirname, '..', 'src'),
        exclude: [/\.(e2e|spec|module|mock)\.ts$/, /node_modules/, /(ngfactory|ngstyle)\.js/]
      }
    ]
  }
};
