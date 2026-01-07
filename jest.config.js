const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testMatch: ['**/*.spec.{ts,tsx}', '**/__tests__/**/*.{ts,tsx}'],
  silent: false,
  verbose: true,
}

module.exports = createJestConfig(customJestConfig)

