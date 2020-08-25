const {pathsToModuleNameMapper} = require('ts-jest/utils');
const {compilerOptions} = require('./tsconfig.json');

module.exports = {
  clearMocks: true,
  collectCoverageFrom: ['src/**/*'],
  coverageDirectory: '<rootDir>/__test__/coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>',
    }),
  },
  preset: 'react-native',
  rootDir: './',
  setupFilesAfterEnv: ['<rootDir>/__test__/utils/setupTests.ts'],
  testPathIgnorePatterns: [
    '/node_modules/',
    './__test__/utils',
    './__test__/coverage',
  ],
};
