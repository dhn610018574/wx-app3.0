const path = require("path");
const webpack = require("webpack");
const WebpackMd5Hash = require("webpack-md5-hash");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const svgDirs = [
  require.resolve("antd-mobile").replace(/warn\.js$/, ""), // 1. 属于 antd-mobile 内置 svg 文件
  path.resolve(__dirname, "src/images/svg") // 2. 自己私人的 svg 存放目录
];

module.exports = {
  mode: "production",
  // https://webpack.js.org/concepts/mode/

  devtool: "cheap-module-eval-source-map",
  //original source (lines only)
  //https://webpack.js.org/configuration/devtool/#components/sidebar/sidebar.jsx

  context: path.resolve(__dirname, "src"),
  // 指定资源读取的根目录
  // https://webpack.js.org/configuration/entry-context/#components/sidebar/sidebar.jsx

  target: "web",
  //打包入口
  entry: {
    vendor: [
      "react",
      "react-dom",
      "react-router",
      "object-assign",
      "es6-promise",
      "whatwg-fetch",
      "react-tap-event-plugin",
      "antd-mobile"
    ],
    app: "index.js"
  },
  //https://webpack.js.org/concepts/entry-points/

  //打包出口
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
    filename: "[name].bundle.js"
  },

  //模块加载规则
  module: {
    rules: [
      /*私有样式，模块化处理*/
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[local]___[hash:base64:5]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              parser: "postcss-scss"
            }
          }
        ],
        include: path.resolve(__dirname, "src/js")
      },
      /*公有样式*/
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              parser: "postcss-scss"
            }
          }
        ],
        include: path.resolve(__dirname, "src/styles")
      },
      /*css-loader */
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      /* url-loader */
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: "url-loader?limit=25000&name=images/[name].[ext]",
        exclude: svgDirs
      },
      /* svg-sprite-loader */
      {
        test: /\.(svg)$/i,
        loader: "svg-sprite-loader",
        include: svgDirs,
        options: {
          limit: 15000
        }
      },
      /*babel-loader*/
      {
        test: /\.(jsx|js|es6)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },

  // 引入外部库
  // 适用于一些常用且体积较大的库，充分利用CDN加速，减轻服务器负担，降低加载时间！
  // https://webpack.js.org/configuration/externals/
  externals: {
    moment: "moment",
    jquery: "jQuery"
  },

  //其他配置
  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "src")],

    //模块查找规则，现在node_modules中查找，然后再在src中查找
    //https://webpack.js.org/configuration/resolve/#resolve-modules

    extensions: [".web.js", ".js", ".json", ".jsx", ".es6"],
    //处理文件后缀名，以规则配置结尾的，不必再写后缀名，自动扩展
    //https://webpack.js.org/configuration/resolve/#resolve-extensions

    alias: {
      app: path.resolve(__dirname, "src/js"),
      style: path.resolve(__dirname, "src/styles"),
      image: path.resolve(__dirname, "src/images")
    }
    //懒癌福音，缩短引入路径
    //例如：import '../../styles/index.css' => import 'style/index.css'
    //注意：别名只能在.js文件中使用。
    //https://webpack.js.org/configuration/resolve/#resolve-alias
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "initial"
        }
      }
    },
    runtimeChunk: {
      name: "manifest"
    }
  },
  // 废弃的CommonsChunkPlugin由optimization代替
  // https://survivejs.com/webpack/building/bundle-splitting/
  // https://survivejs.com/webpack/optimizing/separating-manifest/

  //插件
  plugins: [
    new WebpackMd5Hash(),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    // 代码压缩
    // https://webpack.js.org/guides/migrating/#uglifyjsplugin-sourcemap

    new ExtractTextPlugin("vendor.css", {
      allChunks: true
    }),

    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),

    new HtmlWebpackPlugin({
      title: "开发模式",
      filename: "index.html",
      favicon: "favicon.ico",
      template: "index.html",
      inject: "body",
      hash: true,
      minify: {
        removeComments: true,
        // 移除HTML中的注释

        collapseWhitespace: true,
        // 删除空白符与换行符

        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
    //https://github.com/jantimon/html-webpack-plugin
    //https://github.com/kangax/html-minifier#options-quick-reference
  ]
};
