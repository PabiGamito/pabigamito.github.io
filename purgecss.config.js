module.exports = {
    content: [
      './src/index.pug',
      './src/style.sass'
    ],
    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
};