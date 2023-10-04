const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: 'cheap-module-source-map',
    entry: {
        popup: path.resolve("./src/popup.tsx"),
        options: path.resolve("src/options.tsx"),
        logic: path.resolve("src/logic.tsx")
    }
        ,
    module: { 
        rules: [
            {
                use: "ts-loader",
                test: /\.tsx$/,
                exclude: /node_modules/,
                
            },
            {
                use: ['style-loader', 'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            indent: 'postcss',
                            plugins: [
                                require('tailwindcss'),
                                require('autoprefixer'),
                            ],
                        
                        }
                    }
                } ],            
                test: /\.css$/i, // Apply the loader to .css files
              },
              { type: 'assets/resource',
               use: 'asset/resource',
               test: /. (png|jpg|jpeg|914|woff|woff2|tff|eot|svg)$/,
            }
            ]

    },
    plugins: [
        new CopyPlugin({
          patterns: [
            { from: path.resolve("src"),
             to: path.resolve("dist") 
            },
        
          ],
        }),

      ...getHtmIPlugins([
        'logic',
        'popup',
        'options'
      ])

      ],
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    output: {
    filename: "[name].js"

    },
    optimization: {
        splitChunks:
       {
        chunks: 'all'
       }    
    },
}
function getHtmIPlugins(chunks) {
    return chunks.map(chunk => new HtmlWebpackPlugin({ 
        title: 'worded',
        filename: `${chunk}.html`,
        chunks: [chunk]
     } ))
    }

    
