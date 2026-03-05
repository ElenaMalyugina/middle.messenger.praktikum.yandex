/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    require('postcss-nested'),
    require('autoprefixer'),
    require('postcss-extend-rule')
  ]
}

module.exports = config;
