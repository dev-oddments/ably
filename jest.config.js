module.exports = {
  setupFilesAfterEnv: [
    'given2/setup',
    'jest-plugin-context/setup',
    './jest.setup',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  coverageReporters: ['json-summary'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'identity-obj-proxy',
    '^@atoms(.*)$': '<rootDir>/src/components/atoms$1',
    '^@molecules(.*)$': '<rootDir>/src/components/molecules$1',
    '^@organisms(.*)$': '<rootDir>/src/components/organisms$1',
    '^@templates(.*)$': '<rootDir>/src/pages/templates$1',
    '^@pages(.*)$': '<rootDir>/src/pages$1',
    '^@assets(.*)&': '<rootDir>/src/assets$1',
    '^@hooks(.*)$': '<rootDir>/src/hooks$1',
    '^@mocks(.*)$': '<rootDir>/src/mocks$1',
    '^@repository(.*)$': '<rootDir>/src/repository$1',
    '^@routes(.*)$': '<rootDir>/src/routes$1',
    '^@store(.*)$': '<rootDir>/src/store$1',
    '^@style(.*)$': '<rootDir>/src/style$1',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@context(.*)$': '<rootDir>/src/context$1',
    '^@parse(.*)$': '<rootDir>/test$1',
  },
};
