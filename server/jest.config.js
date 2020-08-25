const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  collectCoverageFrom: [
    'src/**/*',
    '!src/database/**/*',
    '!src/index.ts'
  ],
  clearMocks: true,
  coverageDirectory: '<rootDir>/__test__/coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  globalSetup: './__test__/utils/globalSetup.ts',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>'
  }),
  rootDir: './',
  setupFilesAfterEnv: [
    './__test__/utils/setupFiles.ts'
  ],
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  transform: {
    ts: 'ts-jest'
  }
}
