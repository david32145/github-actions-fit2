module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@config': './src/config',
        '@core': './src/core',
        '@Database': './src/database/Database',
        '@app': './src/app',
        '@application': './src/app'
      }
    }]
  ],
  ignore: [
    './src/@types',
    './__test__'
  ]
}
