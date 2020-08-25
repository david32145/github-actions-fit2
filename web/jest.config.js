const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    'src/**/*'
  ],
  coverageDirectory: '<rootDir>/__test__/coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>'
    }),
    '\\.(css|less)$': 'identity-obj-proxy'
  },
  preset: 'ts-jest',
  rootDir: './',
  setupFilesAfterEnv: [
    '<rootDir>/__test__/utils/setupTests.ts'
  ],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '/node_modules/',
    './__test__/utils',
    './__test__/coverage'
  ],
  transform: {
    '^.ts(x)?': 'babel-jest'
  }
}
