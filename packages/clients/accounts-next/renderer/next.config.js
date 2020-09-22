const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(
  ['@shared/axios', '@shared/web-styles']
);

module.exports = withPlugins([withTM], {
  webpack: (config) => Object.assign(config, {
    target: 'electron-renderer',
  }),
})
