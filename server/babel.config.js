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
        '@Database': './src/database/Database.ts',
        '@app': './src/app'
      }
    }]
  ],
  ignore: [
    './src/@types',
    './src/__test__'
  ]
}
