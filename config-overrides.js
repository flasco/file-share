const { injectBabelPlugin } = require('react-app-rewired');
const path = require('path');
const rewireCssModules = require('react-app-rewire-css-modules');
const rewireLess = require('react-app-rewire-less');
const createRewireDll = require('react-app-rewire-dll');

module.exports = function override(config, env) {
  // do stuff with the webpack config...
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
    config,
  );

  // 支持scss的css modules
  config = rewireCssModules(config, env);

  config = rewireLess.withLoaderOptions({
    modifyVars: { '@primary-color': '#32AFB4' },
    javascriptEnabled: true,
  })(config, env);

  if (env !== 'development') {
    config = createRewireDll({
      entry: {
        vendor: [
          'react',
          'react-dom',
          'dva',
          'axios'
        ]
      },
      path: './static/js',
      filename: '[name].dll.js'
    })(config, env);
  }

  config.resolve = {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      utils: path.resolve(__dirname, 'src/utils'),
      assets: path.resolve(__dirname, 'src/assets'),
      api: path.resolve(__dirname, 'src/api'),
    }
  };

  return config;
};
