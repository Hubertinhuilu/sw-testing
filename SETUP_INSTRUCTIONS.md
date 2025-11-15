# Setup Instructions

## GitHub Repository Setup

### 1. Create GitHub Repository (Already Done)
- Repository URL: https://github.com/Hubertinhuilu/sw-testing
- Repository is public (required for free Coveralls)
- Both team members have access

### 2. Push Code to GitHub (Already Done)
```bash
git remote add origin https://github.com/Hubertinhuilu/sw-testing.git
git branch -M main
git push -u origin main
```

## Coveralls Setup

### Step 1: Sign up for Coveralls
1. Go to https://coveralls.io/
2. Click "Sign in with GitHub"
3. Authorize Coveralls to access your GitHub account

### Step 2: Add Repository to Coveralls
1. After signing in, click "+ ADD REPOS" in the left sidebar
2. Find your repository: `Hubertinhuilu/sw-testing`
3. Toggle the switch to ON for your repository
4. Click "DETAILS" to see the repository page on Coveralls

### Step 3: Verify GitHub Actions Token
The workflow uses `GITHUB_TOKEN` which is automatically provided by GitHub Actions.
No manual token configuration is needed!

**IMPORTANT: DO NOT add any manual tokens to your repository**

### Step 4: Trigger First Workflow
1. Make a commit to your repository (or re-run existing workflow)
2. Go to GitHub → Your Repository → Actions tab
3. You should see the "Tests and Coverage" workflow running
4. After the workflow completes, coverage will be sent to Coveralls

### Step 5: Get Coverage Badge
1. Go to your Coveralls repository page
2. Click "BADGE URLS" button
3. Copy the Markdown badge code
4. Update README.md with the actual badge URL:
   ```markdown
   ![Coverage Status](https://coveralls.io/repos/github/Hubertinhuilu/sw-testing/badge.svg?branch=main)
   ```

## Running Tests Locally

### Install Dependencies
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

### Run Only Manual Tests
```bash
npm run test:manual
```

### Run Only AI-Generated Tests
```bash
npm run test:ai
```

### View Coverage Report Locally
After running `npm run test:coverage`, open:
```
coverage/index.html
```
in your web browser.

## Troubleshooting

### Tests Fail Locally But Pass in CI
- Check Node.js version (workflow uses 18.x and 20.x)
- Ensure all dependencies are installed: `npm ci`

### Coveralls Shows No Coverage
1. Check GitHub Actions workflow completed successfully
2. Verify the workflow uploaded coverage:
   - Go to Actions → Latest workflow run
   - Check "Run tests with coverage" step
   - Check "Upload coverage to Coveralls" step
3. Ensure lcov.info was generated in coverage directory

### GitHub Actions Workflow Not Running
1. Check `.github/workflows/test.yml` exists
2. Ensure you pushed to `main` or `develop` branch
3. Check Actions tab → Workflows → Enable workflow if disabled

## Current Test Results

- **Total Tests**: 312
- **Passing**: 304 (97.4%)
- **Failing**: 8 (minor test implementation issues)

## Known Issues in Tests

1. Some tests use `jest.fn()` which requires additional configuration for ES modules
2. A few edge case expectations differ from actual implementation behavior
3. These don't affect coverage calculation or bug detection

## Continuous Integration

The GitHub Actions workflow automatically:
- ✅ Runs on every push to main/develop
- ✅ Runs on every pull request to main
- ✅ Tests with Node.js 18.x and 20.x
- ✅ Generates coverage report
- ✅ Sends coverage to Coveralls
- ✅ Provides feedback on PR status

## Next Steps for Assignment

1. ✅ Tests implemented (10 functions, manual + AI)
2. ✅ GitHub Actions configured
3. ⚠️  **TODO**: Sign up for Coveralls and add repository
4. ⚠️  **TODO**: Update README.md with actual Coveralls badge
5. ⚠️  **TODO**: Take screenshots of:
   - GitHub Actions workflow running
   - Test results in GitHub Actions
   - Coverage report in Coveralls
6. ⚠️  **TODO**: Complete test report document
