const { injectBabelPlugin } = require('react-app-rewired');
const path = require('path');
const rewireSass = require('react-app-rewire-scss');
const rewireLess = require('react-app-rewire-less');
const createRewireDll = require('react-app-rewire-dll');

module.exports = function override(config, env) {
  // do stuff with the webpack config...
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
    config,
  );

  config = rewireSass(config, env);

  config = rewireLess.withLoaderOptions({
    modifyVars: { '@primary-color': '#1DA57A' },
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
    }
  };

  return config;
};
