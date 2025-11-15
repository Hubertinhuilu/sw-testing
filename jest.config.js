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

  // Coverage thresholds - adjusted based on 10/43 functions tested
  // Assignment only requires testing 10 prioritized functions
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 39,
      lines: 54,
      statements: 53,
    },
  },

  // Inject globals (jest, expect, test, etc.)
  injectGlobals: true,

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
