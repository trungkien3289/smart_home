// module.exports = function override(config, env) {
//     //do stuff with the webpack config...
//     return config;
//   }
const rewireTypescript = require('react-app-rewire-typescript')
const rewireReactHotLoader = require('react-app-rewire-hot-loader')

/* config-overrides.js */
// module.exports = function override (config, env) {
//   config = rewireReactHotLoader(config, env)
//   return config
// }

module.exports = function override(config, env) {
    // if (env === 'development') {
      // config.resolve.alias['react-dom'] = '@hot-loader/react-dom';
    // }
    config = rewireTypescript(config, env)
    config = rewireReactHotLoader(config, env);
    return config;
  };