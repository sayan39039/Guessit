const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = (envVar) => {
  const { env } = envVar;
  const variableConfig = require(`./webpack.${env}.js`);
  const config = merge(commonConfig, variableConfig);
  return config;
};
