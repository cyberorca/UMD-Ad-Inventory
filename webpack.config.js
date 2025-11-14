const path = require("path");
const { version } = require("./package.json"); 
const { WebpackManifestPlugin } = require('webpack-manifest-plugin'); 
const ESLintPlugin= require('eslint-webpack-plugin');

module.exports = {
  mode: "production",
  entry: "./src/global_init.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `KLYCreative.${version}.umd.js`, // Main bundle
    chunkFilename: `KLYCreative.[name].${version}.[contenthash].js`, // Dynamic imports
    library: "KLYCreative",
    libraryTarget: "umd",
    globalObject: "this"
  },
  plugins: [
    new WebpackManifestPlugin({
      fileName: 'manifest.json', // Name of the manifest file
      publicPath: '/', // Public path for assets
      generate: (seed, files) => {
        const manifest = files.reduce((acc, file) => {
          acc[file.name] = {
            path: file.path,
            chunk: file.isInitial ? 'initial' : 'chunk',
          };
          return acc;
        }, seed);
        return manifest;
      },
    }),
    new ESLintPlugin({
      extensions: ['js'],
      emitWarning: true,   // optional
      failOnError: false,  // optional
    })
  ],
};
