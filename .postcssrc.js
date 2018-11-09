// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    "postcss-aspect-ratio-mini": {},
    "postcss-write-svg": {
      utf8: false
    },
    "postcss-cssnext": {},
    "postcss-px-to-viewport": {
      viewportWidth: 750, // 视窗的宽度，对应的是设计稿宽度，一般是750
      viewportHeight: 1334, // 视窗高度，一般指定1334，也可以不配置
      unitPrecision: 3, //d 指定px转换视窗单位时的小数位数
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，'vw'
      selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，
      minPixelValue: 1, // 小雨或等于‘1px’不转换为视窗单位
      mediaQuery: false // 允许在媒体查询中转换px
    },
    "cssnano": {
      preset: "advanced",
      autoprefixer: false,
      "postcss-zindex": false
    }
    // to edit target browsers: use "browserslist" field in package.json
  }
}
