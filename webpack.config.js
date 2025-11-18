const path = require("path");
const { version } = require("./package.json");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Environment detection
const isProduction = process.env.NODE_ENV === 'production' || process.argv.includes('--mode=production');
const isDevelopment = !isProduction;
const shouldAnalyze = process.env.ANALYZE === 'true';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: "./src/global_init.js",
  
  // Source maps for debugging
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `KLYCreative.${version}.umd.js`, // Main bundle
    chunkFilename: `KLYCreative.[name].${version}.[contenthash].js`, // Dynamic imports
    library: "KLYCreative",
    libraryTarget: "umd",
    globalObject: "this",
    clean: true, // Clean output directory before emit
  },
  
  // Optimization settings
  optimization: {
    minimize: isProduction,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: false,
        vendors: false,
      },
    },
  },
  
  // Build statistics
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  },
  
  // Fail on first error in production
  bail: isProduction,
  
  plugins: [
    // Clean dist folder before build (only in production)
    ...(isProduction ? [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['**/*'],
        verbose: true,
      })
    ] : []),
    
    // Manifest plugin
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
    
    // ESLint plugin
    new ESLintPlugin({
      extensions: ['js'],
      emitWarning: true,
      failOnError: isProduction, // Fail in production, warn in development
      failOnWarning: false,
    }),
    
    // Bundle analyzer (optional)
    ...(shouldAnalyze ? [new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: true,
    })] : []),
  ],
};
