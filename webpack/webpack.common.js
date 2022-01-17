const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const ESLintPlugin = require("eslint-webpack-plugin");

const configPath = "./config";
const paths = require(`${configPath}/paths`);
const getClientEnvironment = require(`${configPath}/env`);

const { appIndexJs, appBuild, publicUrlOrPath } = paths;

// We will provide `paths.publicUrlOrPath` to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrlOrPath);

module.exports = {
  entry: appIndexJs,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(s[ac]ss|js|ts)/,
        enforce: "pre",
        loader: "import-glob",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    symlinks: true,

    alias: {
      "@": path.resolve(__dirname, "../src"),
      "@/static": path.resolve(__dirname, "../public/static"),
      // "@tomato": path.resolve(__dirname, "node_modules/tomato"),
      // react is resolved here to avoid importing it twice
      // because of yarn link
      react: path.resolve("./node_modules/react"),
      "react-redux": path.resolve("./node_modules/react-redux"),
      "react-router-dom": path.resolve("./node_modules/react-router-dom"),
    },
    extensions: [".tsx", ".ts", ".js", "jsx"],
  },
  plugins: [
    new ESLintPlugin(),
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
    // It will be an empty string unless you specify "homepage"
    // in `package.json`, in which case it will be the pathname of that URL.
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV is set to production
    // during a production build.
    // Otherwise React will be compiled in the very slow development mode.
    new webpack.DefinePlugin(env.stringified),
    new WebpackManifestPlugin(),
    // new webpack.optimize.UglifyJsPlugin({}),
  ],
  output: {
    // The build folder.
    path: appBuild,
    // this defaults to 'window', but by setting it to 'this' then
    // module chunks which are built will work in web workers as well.
    globalObject: "this",
  },
};