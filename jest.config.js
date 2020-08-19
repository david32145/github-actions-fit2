module.exports = {
  clearMocks: true,
  projects: [
    '<rootDir>/server/jest.config.js',
    '<rootDir>/web/jest.config.js'
  ],
  testMatch: ['*.spec.ts', '*.spec.tsx']
}