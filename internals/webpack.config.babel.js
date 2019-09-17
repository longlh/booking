import glob from 'glob'
import path from 'path'

// webpack plugins
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import WebpackAssetsManifest from 'webpack-assets-manifest'

// location definitions
const rootDir = path.join(__dirname, '..')
const resourceDir = path.join(rootDir, 'src/resources')
const outDir = path.join(rootDir, 'data/dist/assets')

// environment
const devMode = process.env.NODE_ENV !== 'production'
const assetEndpoint = process.env.ASSET_ENDPOINT || ''

// search all index.files(js|scss|...) in resources/pages
const pageEntries = glob.sync(
  path.join(resourceDir, 'pages/**/*/index.*'),
  { nodir: true }
).reduce(
  (entries, file) => {
    const dir = path.dirname(file)
      .replace(resourceDir, '')
      .replace(/^\/pages\//, '')

    return {
      ...entries,
      [dir]: [
        ...(entries[dir]) || [],
        file
      ]
    }
  },
  {}
)

export default {
  mode: 'production',
  entry: {
    ...pageEntries,
    img: glob.sync(
      path.join(resourceDir, 'img/**/*'),
      { noDir: true }
    )
  },
  output: {
    path: outDir,
    filename: 'js/[name].[hash:6].js',
    publicPath: `${assetEndpoint}/assets`,
    pathinfo:false
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:6].css'
    }),
    devMode ? null : new OptimizeCssAssetsPlugin(),
    new WebpackAssetsManifest({
      output: path.join(outDir, '../manifest.json'),
      publicPath: `${assetEndpoint}/assets/`,
      writeToDisk: true
    })
  ].filter((a) => a),
  resolve: {
    extensions: [ '.js', '.jsx', '.css', '.scss', '.sass' ],
    modules: [
      'node_modules',
      'src/resources'
    ]
  },
  module: {
    rules: [ {
      test: /.\m?(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react'
          ],
          plugins: [
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-transform-runtime'
          ]
        }
      }
    }, {
      test: /\.css$/,
      use: [ {
        loader: MiniCssExtractPlugin.loader
      }, {
        loader: 'css-loader'
      } ]
    }, {
      test: /\.(scss|sass)$/,
      use: [ {
        loader: MiniCssExtractPlugin.loader
      }, {
        loader: 'css-loader'
      }, {
        loader: 'sass-loader'
      } ]
    }, {
      test: /.(ico|jpg|png|gif|svg|bmp|webp)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: 'img/[path][name].[hash:6].[ext]',
          publicPath: `${assetEndpoint}/assets`,
          emitFile: true,
          context: 'src/resources/img'
        }
      }
    }, {
      test: /.(eot|ttf|woff|woff2)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[hash:6].[ext]',
          publicPath: `${assetEndpoint}/assets`,
          emitFile: true
        }
      }
    } ]
  }
}
