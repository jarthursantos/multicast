module.exports = {
  rendererSrcDir: 'src',
  webpack: (defaultConfig, env) => Object.assign(defaultConfig, {
    entry: {
      background: './main.ts',
    },
  }),
};
