import path from 'path';
import type {Configuration} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

type BuildMode = 'development' | 'production';

interface EnvVariables {
  mode: BuildMode;
}

const libraryName = 'custom-components-lib';

export default (env: EnvVariables): Configuration => {
  const config: Configuration = {
    mode: env.mode ?? 'development',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      path: path.resolve(__dirname, 'lib'),
      filename: libraryName + '.js',
      library: libraryName,
      libraryTarget: 'umd',
      umdNamedDefine: true,
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
          use: [{loader: 'style-loader'}, {loader: 'css-loader', options: {modules: true}}, {loader: 'sass-loader'}],
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
