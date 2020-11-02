import { cli } from "react-ssg/server.mjs";
import { rootFolder } from "./paths.mjs";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
//import ErrorOverlayPlugin from "error-overlay-webpack-plugin";


cli({
  path: {
    root: rootFolder,
  },
  webpack: {
    baseConfig: {
      devtool: 'cheap-module-source-map',
      plugins: [
        new MiniCssExtractPlugin({
          filename: 'app.[hash].bundle.css',
        }),
        //new ErrorOverlayPlugin(),
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
        ],
      },
    },
  },
});
