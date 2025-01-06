import path from 'path';
import type {Configuration} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

type BuildMode = 'development' | 'production';

interface EnvVariables {
  mode: BuildMode;
}

export default (env: EnvVariables) => {
  const config: Configuration = {
    mode: env.mode ?? 'development',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      clean: true,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
          },
        },
        {
          test: /\.s?css$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
      }),
    ],
  };

  return config;
};
