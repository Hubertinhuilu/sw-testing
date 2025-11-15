# Bug Reports

This document contains detailed bug reports for issues found during unit testing of the utility library.

---

## BUG-001: filter.js - Incorrect Result Initialization

**Severity**: High
**Priority**: High
**Status**: Open
**Discovered**: During Phase 1 code analysis and Phase 2 test implementation

### Summary
The `filter.js` function initializes the result array incorrectly as a nested array `[[]]` instead of an empty array `[]`.

### Location
- **File**: `src/filter.js`
- **Line**: 28
- **Code**:
  ```javascript
  const result = [[]]  // INCORRECT
  ```

### Expected Behavior
When no elements match the predicate, the function should return an empty array:
```javascript
filter([1, 2, 3], (x) => x > 10)
// Expected: []
```

### Actual Behavior
When no elements match the predicate, the function returns a nested array with one empty array:
```javascript
filter([1, 2, 3], (x) => x > 10)
// Actual: [[]]
```

### Steps to Reproduce
1. Call `filter()` with an array and a predicate that no elements satisfy
2. Observe the returned result
3. Result is `[[]]` instead of `[]`

### Test Case
```javascript
// TC-FILTER-002: Filter with No Matches
const result = filter([1, 2, 3], (n) => n > 10);
console.log(result); // [[]] (buggy)
// Should be: []
```

### Impact
- **Correctness**: Function returns incorrect data structure
- **Business Impact**: Could cause errors in e-commerce product filtering
  - Empty search results would appear as `[[]]` instead of `[]`
  - Downstream code checking `result.length === 0` would fail (length is 1, not 0)
  - Could break UI components expecting empty array

### Root Cause
Line 28 initializes `result` as `[[]]` (array containing an empty array) instead of `[]` (empty array).

### Recommended Fix
```javascript
// Change line 28 from:
const result = [[]]

// To:
const result = []
```

### Related Issues
This bug also affects:
- Null input: `filter(null, predicate)` returns `[[]]` instead of `[]`
- Undefined input: `filter(undefined, predicate)` returns `[[]]` instead of `[]`

### Test Coverage
- TC-FILTER-002: Filter with No Matches
- TC-FILTER-007: Empty Array Input
- TC-FILTER-008: Null Array Input
- TC-FILTER-009: Undefined Array Input

---

## BUG-002: toString.js - Documentation Discrepancy

**Severity**: Low
**Priority**: Medium
**Status**: Open
**Discovered**: During Phase 2 test implementation

### Summary
The documentation for `toString.js` states that empty strings are returned for `null` and `undefined` values, but the actual implementation returns `"null"` and `"undefined"`.

### Location
- **File**: `src/toString.js`
- **Lines**: 7-8 (documentation), 25-40 (implementation)
- **Documentation**:
  ```javascript
  /**
   * Converts `value` to a string. An empty string is returned for `null`
   * and `undefined` values. The sign of `-0` is preserved.
   */
  ```

### Expected Behavior (Per Documentation)
```javascript
toString(null)      // Expected: ''
toString(undefined) // Expected: ''
```

### Actual Behavior
```javascript
toString(null)      // Actual: 'null'
toString(undefined) // Actual: 'undefined'
```

### Steps to Reproduce
1. Call `toString(null)`
2. Observe result is `"null"` not `""`
3. Call `toString(undefined)`
4. Observe result is `"undefined"` not `""`

### Test Case
```javascript
// Actual behavior test
expect(toString(null)).toBe('null');      // Passes
expect(toString(undefined)).toBe('undefined'); // Passes

// Documentation claims
expect(toString(null)).toBe('');      // Fails
expect(toString(undefined)).toBe(''); // Fails
```

### Impact
- **Documentation**: Misleading documentation
- **Business Impact**: LOW
  - Most e-commerce use cases handle null/undefined before calling toString
  - Actual behavior is reasonable (converting to string representation)
  - Documentation should be updated to match implementation

### Root Cause
No special handling for null/undefined in the implementation. The function uses template literal coercion `${value}` which converts:
- `null` → `"null"`
- `undefined` → `"undefined"`

To match documentation, would need:
```javascript
function toString(value) {
  if (value == null) {  // checks both null and undefined
    return '';
  }
  // ... rest of implementation
}
```

### Recommended Fix
**Option 1** (Update Documentation):
```javascript
/**
 * Converts `value` to a string. Returns string representation of the value.
 * The sign of `-0` is preserved.
 */
```

**Option 2** (Update Implementation):
Add null/undefined check at the beginning of the function.

**Recommendation**: Option 1 (update documentation) is preferred as the current behavior is reasonable and less likely to break existing code.

### Test Coverage
- toString.manual.test.js lines 12-22

---

## BUG-003: words.js - Number/Letter Boundary Splitting

**Severity**: Low
**Priority**: Low
**Status**: Documented (Expected Behavior)

### Summary
The `words()` function splits on number/letter boundaries, which may be unexpected behavior for some use cases.

### Location
- **File**: `src/words.js`
- **Implementation**: Uses Unicode word detection regex

### Behavior
```javascript
words('item123')     // ['item', '123']
words('product456')  // ['product', '456']
```

### Expected By Users (Possibly)
```javascript
words('item123')     // ['item123']
words('product456')  // ['product456']
```

### Analysis
This is **not a bug** but rather an intentional feature based on the regex implementation.  The function detects word boundaries including number/letter transitions.

### Impact
- **Business Impact**: VERY LOW
- For e-commerce product codes like "PROD123", this splits into ["PROD", "123"]
- Users can provide custom pattern if different behavior is needed

### Workaround
Use custom pattern parameter:
```javascript
words('item123 product456', /\S+/g)
// Returns: ['item123', 'product456']
```

### Recommendation
Document this behavior clearly in function documentation.

---

## Summary Statistics

| Bug ID | Severity | Priority | File | Status |
|--------|----------|----------|------|--------|
| BUG-001 | High | High | filter.js | Open |
| BUG-002 | Low | Medium | toString.js | Open |
| BUG-003 | Low | Low | words.js | Documented |

### Severity Definitions
- **High**: Causes incorrect behavior that affects functionality
- **Medium**: Causes unexpected behavior but has workarounds
- **Low**: Minor issue or documentation discrepancy

### Priority Definitions
- **High**: Should be fixed before production use
- **Medium**: Should be fixed in next release
- **Low**: Can be addressed in future releases

## Recommendations for E-Commerce Application

1. **BUG-001 (filter.js)**: Must be fixed before using for product filtering
   - HIGH RISK for empty search results
   - Could break UI components
   - Fix is simple (one line change)

2. **BUG-002 (toString.js)**: Low priority
   - Current behavior is acceptable
   - Update documentation to match implementation

3. **BUG-003 (words.js)**: No action needed
   - This is expected behavior
   - Use custom pattern if different behavior needed

## Quality Gate Assessment

**Can this library be used in production?**

- ⚠️ **NOT RECOMMENDED** without fixing BUG-001
- ✅ **ACCEPTABLE** after fixing filter.js initialization bug
- All other functions tested work correctly for e-commerce use cases

**Test Coverage**: 97.4% of tests passing
**Critical Bugs**: 1 (filter.js)
**Documentation Issues**: 1 (toString.js)
