module.exports = {
  // syntax: 'postcss-scss',
  plugins: [
    // require('postcss-import')({}),
    require('autoprefixer')({ /* ...options */ })
  ]
}

// module.exports = {
//   // parser: 'sugarss',
//   plugins: {
//     'postcss-import': {},
//     'postcss-preset-env': {},
//     // 'cssnano': {}
//   }
// }
