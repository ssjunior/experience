process.env.NODE_ENV = "production";

const common = require("./webpack.common.js");
const path = require("path");

const { merge } = require("webpack-merge");
const webpack = require("webpack");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageminWebpack = require("image-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const paths = require("./config/paths");
const { appBuild, appPublic, appHtml } = paths;

module.exports = merge(common, {
  mode: "production",
  devtool: false,
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(appPublic, "favicon.ico"),
          to: path.resolve(appBuild, "favicon.ico"),
          toType: "file",
          noErrorOnMissing: true,
        },
        {
          from: path.resolve(appPublic, "static"),
          to: path.resolve(appBuild, "static"),
          toType: "dir",
          noErrorOnMissing: true,
        },
      ],
    }),

    new HtmlWebpackPlugin({
      inject: true,
      template: appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new webpack.ProgressPlugin({
      modulesCount: 5000,
    }),
  ],

  optimization: {
    nodeEnv: "production",
    splitChunks: {
      chunks: "async",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    minimize: true,
    minimizer: [
      // This is only used in production mode
      new TerserPlugin({
        terserOptions: {
          parse: {
            // We want terser to parse ecma 8 code. However, we don't want it
            // to apply any minification steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending further investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          // Added for profiling in devtools
          // keep_classnames: isEnvProductionProfile,
          // keep_fnames: isEnvProductionProfile,
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            // eslint-disable-next-line camelcase
            ascii_only: true,
          },
        },
      }),
      // This is only used in production mode
      new ImageminWebpack({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              "imagemin-gifsicle",
              "imagemin-mozjpeg",
              "imagemin-pngquant",
              "imagemin-svgo",
            ],
          },
        },
        loader: false,
      }),
    ],
  },
  output: {
    // There will be one main bundle, and one file per asynchronous chunk.
    // In development, it does not produce real files.
    // filename: "static/js/bundle.js",
    filename: "static/js/[name].[contenthash].js",
    // There are also additional JS chunk files if you use code splitting.
    // chunkFilename: "static/js/[name].chunk.js",
    chunkFilename: "static/js/[name].[contenthash].chunk.js",
    path: appBuild,
    pathinfo: true,
    publicPath: "/",
  },

  // output: {
  //   publicPath: "",
  //   pathinfo: true,
  //   filename: "static/js/[name].[chunkhash].js",
  //   chunkFilename: "static/js/[name].[chunkhash].chunk.js",
  // },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
