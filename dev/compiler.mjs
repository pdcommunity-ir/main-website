import webpack from "webpack";
import path from "path";
import { rootFolder } from "../paths.mjs";
import AssetPlugin from "assets-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ErrorOverlayPlugin from "error-overlay-webpack-plugin";

const clientConfig = {
  devtool: 'cheap-module-source-map',
  plugins: [
    new AssetPlugin({ path: path.join(rootFolder, 'babeloutput')}),
    new MiniCssExtractPlugin({
      filename: 'app.[hash].bundle.css',
    }),
    new ErrorOverlayPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { modules: true, url: false },
          },
        ],
      },
    ]
  },
  mode: 'development',
  context: path.resolve(rootFolder, './dev/'),
  entry: {
    app: './client.js',
  },
  output: {
    path: path.resolve(rootFolder, './public/dist'),
    filename: 'app.[hash].bundle.js',
  },  
};

export const clientCompiler = webpack(clientConfig);
