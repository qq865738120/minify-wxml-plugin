# minify-wxml-plugin
用于压缩小程序 wxml 的 Webpack 插件

----

### 安装

```shell
yarn add minify-wxml-plugin
```

#### 参数

当前只支持 `collapseWhitespace` 

#### 问题
> 测试过程中发现一些问题
- 自定义标签，例如`<base></base>`,压缩之后变成`<base>`，导致编译报错，这是 `html-minifier` 压缩的问题，开发过程中应当避免此类自定义标签
- 压缩的效率不高，当前只做了去除空格、换行
- 其他问题
