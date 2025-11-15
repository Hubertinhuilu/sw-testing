export default {
  // Test environment
  testEnvironment: 'node',

  // Transform files with Babel to support ES modules
  transform: {
    '^.+\\.js$': 'babel-jest',
  },

  // Test file patterns
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.js',
  ],

  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/.internal/**',  // Exclude internal directory as per assignment
    '!src/index.js',      // Exclude index if it's just exports
  ],

  // Coverage thresholds (optional - can adjust based on goals)
  coverageThresholds: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  // Coverage reporters
  coverageReporters: [
    'text',
    'text-summary',
    'html',
    'lcov',
  ],

  // Verbose output
  verbose: true,

  // Module file extensions
  moduleFileExtensions: ['js', 'json'],

  // Clear mocks between tests
  clearMocks: true,

  // Coverage directory
  coverageDirectory: 'coverage',
};
