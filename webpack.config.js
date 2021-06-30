const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3000;

module.exports = (env) => {
  const isDevelopment = env === 'isDevelopment';

  return {
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'inline-source-map' : 'hidden-source-map',
    entry: './src/index.tsx',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },

    module: {
      rules: [
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          use: {
            loader: 'url-loader',
          },
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.(ts|js)x?$/,
          include: path.resolve('src'),
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: true,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        '@atoms': path.resolve(__dirname, 'src/components/atoms'),
        '@molecules': path.resolve(__dirname, 'src/components/molecules'),
        '@organisms': path.resolve(__dirname, 'src/components/organisms'),
        '@templates': path.resolve(__dirname, 'src/pages/template'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@mocks': path.resolve(__dirname, 'src/mocks'),
        '@repository': path.resolve(__dirname, 'src/repository'),
        '@routes': path.resolve(__dirname, 'src/routes'),
        '@store': path.resolve(__dirname, 'src/store'),
        '@style': path.resolve(__dirname, 'src/style'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@context': path.resolve(__dirname, 'src/context'),
        '@parse': path.resolve(__dirname, 'test'),
      },
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico',
      }),
    ],

    devServer: {
      host: 'localhost',
      port,
      stats: 'errors-only',
      open: true,
      historyApiFallback: true,
    },
  };
};
