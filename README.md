# Utility Library Testing Project

Software Testing Assignment - Phase 2
Tampere University

## Project Description

This project contains comprehensive unit testing for a JavaScript utility library used in an e-commerce food store application. The library provides 43+ utility functions for data validation, transformation, and manipulation.

## Test Coverage

This project implements unit tests for 10 prioritized utility functions based on their criticality to the e-commerce application:

1. **toNumber.js** - Critical for price conversions with two decimal accuracy
2. **filter.js** - Product filtering and search functionality
3. **isEmpty.js** - Validation across multiple data types
4. **get.js** - Safe nested property access
5. **words.js** - Text parsing for search and validation
6. **every.js** - Validation of items meeting criteria
7. **reduce.js** - Cart total calculations
8. **toString.js** - String operations foundation
9. **map.js** - Data transformation for display
10. **toFinite.js** - Ensures finite numbers for price validation

## Testing Approach

The project implements two distinct test suites:

### Manual Test Suite (`tests/manual/`)
- Based on detailed test case designs from Phase 1
- Focuses on `filter.js` (15 test cases) and `toNumber.js` (50 test cases)
- Includes tests for all 10 prioritized functions
- Uses black-box testing techniques (boundary value analysis, equivalence partitioning)

### AI-Generated Test Suite (`tests/ai-generated/`)
- Tests generated using Claude Code AI assistant
- Parallel test coverage for `filter.js` and `toNumber.js`
- Comparison study of AI-assisted vs manual test design

## Running Tests Locally

### Prerequisites
- Node.js (v18 or later)
- npm

### Installation
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Run Manual Tests Only
```bash
npm run test:manual
```

### Run AI-Generated Tests Only
```bash
npm run test:ai
```

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration:
- Automated testing on every push
- Coverage reports sent to Coveralls
- Node.js v18 and v20 tested

## Coverage Badge

[![Coverage Status](https://coveralls.io/repos/github/Hubertinhuilu/sw-testing/badge.svg)](https://coveralls.io/github/Hubertinhuilu/sw-testing)

## Project Structure

```
utility-library/
├── src/                    # Source code (43+ utility functions)
├── tests/
│   ├── manual/            # Manually designed test suites
│   └── ai-generated/      # AI-generated test suites
├── .github/
│   └── workflows/         # GitHub Actions CI/CD configuration
├── coverage/              # Coverage reports (generated)
├── package.json           # Dependencies and scripts
└── jest.config.js         # Jest configuration
```

## Known Issues

- **filter.js line 28**: `result = [[]]` should be `result = []` (documented bug)

## License

MIT License - see src/LICENSE for details

**IMPORTANT**: The license file in `src/LICENSE` must NOT be removed under any circumstances!

## Authors

Software Testing Course Assignment
Tampere University

## Links

- GitHub Repository: [Add your repo URL here]
- Coveralls Coverage: [Add your Coveralls URL here]
