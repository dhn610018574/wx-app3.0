const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const svgDirs = [
  require.resolve("antd-mobile").replace(/warn\.js$/, ""), // 1. 属于 antd-mobile 内置 svg 文件
  path.resolve(__dirname, "src/images/svg") // 2. 自己私人的 svg 存放目录
];
module.exports = {
  mode:'development',
  devtool: "cheap-module-source-map",
  //original source (lines only)
  //https://webpack.js.org/configuration/devtool/#components/sidebar/sidebar.jsx

  context: path.resolve(__dirname, "src"),
    // 指定资源读取的根目录
  // https://webpack.js.org/configuration/entry-context/#components/sidebar/sidebar.jsx

  target: "web",
  //打包入口
  entry: [
    "webpack-public-path",
    "react-hot-loader/patch",
    "webpack-hot-middleware/client?reload=true",
    "index.js"
  ],

  //打包出口
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "bundle.js"
  },

  //模块加载规则
  module: {
    rules: [
      /*私有样式，模块化处理*/
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName:'[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              parser: 'postcss-scss'
            }
          }
        ],
        include: path.resolve(__dirname, 'src/js')
      },
      /*公有样式*/
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              parser: 'postcss-scss'
            }
          }
        ],
        include: path.resolve(__dirname, 'src/styles')
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
    jquery: 'jQuery'
  },

  //其他配置
  resolve: {
    modules:[
      'node_modules',
      path.resolve(__dirname, 'src')
    ],
    
    //模块查找规则，现在node_modules中查找，然后再在src中查找
    //https://webpack.js.org/configuration/resolve/#resolve-modules

    extensions: ['.web.js', '.js', '.json','.jsx'],
    //处理文件后缀名，以规则配置结尾的，不必再写后缀名，自动扩展
    //https://webpack.js.org/configuration/resolve/#resolve-extensions

    alias:{
      app:path.resolve(__dirname,'src/js'),
      style:path.resolve(__dirname,'src/styles'),
      image:path.resolve(__dirname,'src/images')
    }
      //懒癌福音，缩短引入路径
     //例如：import '../../styles/index.css' => import 'style/index.css' 
     //注意：别名只能在.js文件中使用。
     //https://webpack.js.org/configuration/resolve/#resolve-alias
  
  },

  //插件
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"development"',
      __DEV__: true
    }),
    //很多库的内部，有process.NODE_ENV的判断语句
    //改为production。最直观的就是没有所有的debug相关的东西，体积会减少很多

    new webpack.HotModuleReplacementPlugin(),
    //启动热替换，仅开发模式需要

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.NoEmitOnErrorsPlugin(),
    //允许错误不打断程序运行

    new HtmlWebpackPlugin({
      title: "开发模式",
      filename: "index.html",
      favicon: "favicon.ico",
      template: "index.html",
      inject: "body"
    })
  ],

  // 本地启动服务
  devServer: {
    contentBase: path.resolve(__dirname, "src"),
    hot: true,
    open: true,
    host: "localhost",
    port: 8010,
    historyApiFallback: true
  }
};
