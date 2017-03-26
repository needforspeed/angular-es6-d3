module.exports = {
  context: __dirname,
  entry: './src/example.js',
  devServer: {
    contentBase: [
      "assets",
      "src",
    ]
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'ng-annotate-loader!babel-loader?presets[]=es2015',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: 'raw-loader'
      },
      {
        test: /\.css$/,
        use: 'css-loader'
      }
    ]
  }
}

