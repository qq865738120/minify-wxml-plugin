import { OptionType } from '../types'
import map from 'lodash/map'
import { minify } from 'html-minifier'
import { Compiler, compilation } from "webpack"

const PLUGIN_NAME = 'MinifyWxmlPlugin'

module.exports = class MinifyWxmlPlugin {
  constructor(options: OptionType) {
    // TODO: 校验参数
    this.options = {
      collapseWhitespace: false,
      ...options
    }
  }

  apply(compiler: Compiler) {

    compiler.hooks.emit.tap(
      PLUGIN_NAME,
      (compilation: compilation.Compilation) => {
        map(compilation.assets, (asset, filename) => {
          let assetSource = asset.source()
          // 匹配所有wxml文件
          if(!!this.options.collapseWhitespace && /.wxml$/.test(filename)) {
            // 压缩wxml文件            
            assetSource = minify(assetSource.toString(), {
              collapseWhitespace: true,
              keepClosingSlash: true
            })
            compilation.assets[filename] = {
              size: () => assetSource.length,
              source: () => assetSource
            }
          }
        })
      }
    )
  }
}