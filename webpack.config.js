const currentTask = process.env.npm_lifecycle_event
const path = require('path')
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fse = require('fs-extra')
const VueLoaderPlugin = require('vue-loader-plugin')

const postCSSPlugins = [
  require('postcss-import'),
  require('postcss-mixins'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('autoprefixer'),
  require('postcss-hexrgba')
]


class RunAfterCompile {
	
	apply(complier) {
		
		complier.hooks.done.tap('copy images', function() {
			
			fse.copySync('./app/assets/images', './docs/assets/images')
			
		})
		
		
	}
	
	
}

let cssConfig = {
	    
        test: /\.css$/i,
        use: [ 'css-loader?url=false', {loader: 'postcss-loader', options: {plugins: postCSSPlugins}}]
      }
	  
	  let pages = fse.readdirSync('./app').filter(function(file){
		  return file.endsWith('.html')
		  }).map(function(page){
			  return new HtmlWebpackPlugin({
			  filename: page,
			  template: `./app/${page}`
			  })
		  })

let config = {
	entry: './app/assets/scripts/app.js',
	plugins: pages,
	module: {
    rules: [
      cssConfig
    ]
	},
	resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
            'numeric-keyboard$': 'numeric-keyboard/dist/numeric_keyboard.vue.js',
            'vue-loading-overlay': 'vue-loading-overlay/dist/vue-loading.min.js',
            'jquery': 'jquery/dist/jquery.js' 
    }
  }
  
	
}

if (currentTask == "dev"){
	config.module.rules.push(
	{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {}
                    // other vue-loader options go here
                }
            }
	
	)
	cssConfig.use.unshift('style-loader')
	config.output =  {
    filename: 'bundled.js',
    path: path.resolve(__dirname, 'app')
  },
  config.devServer = {
    before: function(app, server) {
      server._watch('./app/**/*.html')
    },
	
	contentBase: path.join(__dirname, 'app'),
    hot: true,
    port: 3000,
    host: '0.0.0.0'
  },
  config.mode = 'development'
	
	
}

if (currentTask == "build"){
	config.module.rules.push({ 
	test: /\.js$/, 
	exclude: /(node_modules)/,
	use: {
		loader: 'babel-loader',
		options: {
			presets: ['@babel/preset-env']
		}
		
		
	}
	},
	{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {}
                    // other vue-loader options go here
                }
            }
	
	)
		cssConfig.use.unshift(MiniCssExtractPlugin.loader)
		postCSSPlugins.push(require('cssnano'))
	config.output =  {
    filename: '[name].[chunkhash].js',
	chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'docs')
  },
  config.mode = 'production',
  config.optimization = {
	  splitChunks: { chunks: "all" }
  
  },
  
  config.plugins.push(
  new CleanWebpackPlugin(), 
  new MiniCssExtractPlugin({filename: 'styles.[chunkhash].css'}),
  new RunAfterCompile()
  )
	
}

 

module.exports = config