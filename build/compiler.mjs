import webpack from "webpack";
import path from "path";
import { rootFolder } from "../paths.mjs";
import AssetPlugin from "assets-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const commonConfig = {
  plugins: [
    new AssetPlugin({ path: path.join(rootFolder, 'babeloutput')}),
    new MiniCssExtractPlugin({
      filename: 'app.[hash].bundle.css',
    }),
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
};

const serverConfig = {
  target: 'node',
  mode: 'development',
  node: {
    __dirname: false,
  },
  context: path.resolve(rootFolder, './build/'),
  entry: {
    app: './main.js',
  },
  output: {
    path: path.resolve(rootFolder, './babeloutput'),
    filename: 'main.js',
  },
  ...commonConfig,
};

const clientConfig = {
  mode: 'production',
  context: path.resolve(rootFolder, './build/'),
  entry: {
    app: './client.js',
  },
  output: {
    path: path.resolve(rootFolder, './public/dist'),
    filename: 'app.[hash].bundle.js',
  },
  ...commonConfig,
};


export const serverCompiler = webpack(serverConfig);
export const clientCompiler = webpack(clientConfig);
