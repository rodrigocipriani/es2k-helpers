const deepmerge = require('deepmerge');

const configCreator = (props) => {
  const { defaultConfig, development, test, production } = props;
  const env = { isDevelopment: false, isTest: false, isProduction: false };

  let config;
  const environment = process.env.NODE_ENV || '';

  switch (environment.toLowerCase()) {
    case 'test':
      env.isTest = true;
      config = test;
      break;
    case 'production':
      env.isProduction = true;
      config = production;
      break;
    default:
      // case 'development':
      env.isDevelopment = true;
      config = development;
      break;
  }

  config.env = env;

  return deepmerge(defaultConfig, config);
};

module.exports = configCreator;
