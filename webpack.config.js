// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 1. Your JS entry point
  entry: './src/index.js',

  // 2. Where and how to output the bundle
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true           // clears old files from dist/ on each build
  },

  // 3. Plugins to enhance the build
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',  // your HTML template
      inject: 'body'                 // injects the <script> tag before </body>
    })
  ],

  // 4. Production mode for optimizations
  mode: 'production'
};
