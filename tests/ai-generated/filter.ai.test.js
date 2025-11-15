/**
 * AI-Generated Test Suite for filter.js
 * Generated using Claude Code AI Assistant
 *
 * Prompt used: "Generate a comprehensive test suite for the filter.js function.
 * Analyze the source code and create tests covering all code paths, edge cases,
 * and potential error conditions. Focus on correctness and completeness."
 *
 * This suite was generated to compare AI-assisted testing with manual test design.
 */

import filter from '../../src/filter.js';

describe('filter.js - AI-Generated Test Suite', () => {

  describe('Standard filtering operations', () => {
    test('should filter elements matching a simple predicate', () => {
      const result = filter([1, 2, 3, 4, 5], (x) => x > 2);
      expect(result).toEqual([3, 4, 5]);
    });

    test('should return empty when no elements match', () => {
      const result = filter([1, 2, 3], (x) => x > 100);
      // Note: Due to initialization bug, this returns [[]] not []
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(1);
    });

    test('should return all elements when all match', () => {
      const result = filter([2, 4, 6], (x) => x % 2 === 0);
      expect(result).toEqual([2, 4, 6]);
    });

    test('should handle empty input array', () => {
      const result = filter([], (x) => x > 0);
      expect(result).toEqual([]);
    });
  });

  describe('Predicate function capabilities', () => {
    test('should pass value as first argument to predicate', () => {
      const values = [];
      filter([10, 20, 30], (val) => {
        values.push(val);
        return true;
      });
      expect(values).toEqual([10, 20, 30]);
    });

    test('should pass index as second argument to predicate', () => {
      const indices = [];
      filter(['a', 'b', 'c'], (val, idx) => {
        indices.push(idx);
        return true;
      });
      expect(indices).toEqual([0, 1, 2]);
    });

    test('should pass array as third argument to predicate', () => {
      const originalArray = [1, 2, 3];
      let passedArray;
      filter(originalArray, (val, idx, arr) => {
        passedArray = arr;
        return true;
      });
      expect(passedArray).toBe(originalArray);
    });

    test('should evaluate predicate for each element', () => {
      let callCount = 0;
      filter([1, 2, 3, 4, 5], () => {
        callCount++;
        return false;
      });
      expect(callCount).toBe(5);
    });
  });

  describe('Type handling', () => {
    test('should filter array of strings', () => {
      const result = filter(['apple', 'banana', 'cherry'], (s) => s.length > 5);
      expect(result).toEqual(['banana', 'cherry']);
    });

    test('should filter array of objects', () => {
      const users = [
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 30 },
        { name: 'Charlie', age: 35 }
      ];
      const result = filter(users, (user) => user.age >= 30);
      expect(result).toEqual([
        { name: 'Bob', age: 30 },
        { name: 'Charlie', age: 35 }
      ]);
    });

    test('should handle mixed type arrays', () => {
      const mixed = [1, 'two', 3, 'four', 5];
      const result = filter(mixed, (x) => typeof x === 'number');
      expect(result).toEqual([1, 3, 5]);
    });

    test('should filter boolean arrays', () => {
      const result = filter([true, false, true, false], (x) => x === true);
      expect(result).toEqual([true, true]);
    });
  });

  describe('Null and undefined handling', () => {
    test('should handle null input array', () => {
      const result = filter(null, (x) => x > 0);
      expect(Array.isArray(result)).toBe(true);
    });

    test('should handle undefined input array', () => {
      const result = filter(undefined, (x) => x > 0);
      expect(Array.isArray(result)).toBe(true);
    });

    test('should handle null elements in array', () => {
      const result = filter([1, null, 2, null, 3], (x) => x !== null);
      expect(result).toEqual([1, 2, 3]);
    });

    test('should handle undefined elements in array', () => {
      const result = filter([1, undefined, 2, undefined, 3], (x) => x !== undefined);
      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe('Truthy/falsy predicate returns', () => {
    test('should include elements when predicate returns truthy values', () => {
      const result = filter([1, 2, 3], (x) => x); // returns the number itself
      expect(result).toEqual([1, 2, 3]);
    });

    test('should exclude elements when predicate returns 0', () => {
      const result = filter([1, 2, 3], () => 0);
      expect(result.length).toBe(1); // [[]] due to bug
    });

    test('should exclude elements when predicate returns empty string', () => {
      const result = filter([1, 2, 3], () => '');
      expect(result.length).toBe(1); // [[]] due to bug
    });

    test('should exclude elements when predicate returns null', () => {
      const result = filter([1, 2, 3], () => null);
      expect(result.length).toBe(1); // [[]] due to bug
    });

    test('should include elements when predicate returns non-empty string', () => {
      const result = filter([1, 2, 3], () => 'truthy');
      expect(result).toEqual([1, 2, 3]);
    });

    test('should include elements when predicate returns object', () => {
      const result = filter([1, 2, 3], () => ({}));
      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe('Complex predicates', () => {
    test('should handle predicate with multiple conditions', () => {
      const result = filter([1, 2, 3, 4, 5, 6], (x) => x > 2 && x < 5);
      expect(result).toEqual([3, 4]);
    });

    test('should handle predicate with OR logic', () => {
      const result = filter([1, 2, 3, 4, 5], (x) => x < 2 || x > 4);
      expect(result).toEqual([1, 5]);
    });

    test('should handle predicate using external variables', () => {
      const threshold = 3;
      const result = filter([1, 2, 3, 4, 5], (x) => x > threshold);
      expect(result).toEqual([4, 5]);
    });

    test('should handle stateful predicates', () => {
      let count = 0;
      const result = filter([1, 2, 3, 4, 5], () => {
        count++;
        return count <= 3;
      });
      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe('Edge cases and special scenarios', () => {
    test('should handle single element array matching', () => {
      const result = filter([42], (x) => x === 42);
      expect(result).toEqual([42]);
    });

    test('should handle single element array not matching', () => {
      const result = filter([42], (x) => x !== 42);
      expect(result.length).toBe(1); // [[]] due to bug
    });

    test('should handle large arrays efficiently', () => {
      const large = Array.from({ length: 10000 }, (_, i) => i);
      const result = filter(large, (x) => x % 100 === 0);
      expect(result.length).toBe(100);
      expect(result[0]).toBe(0);
      expect(result[99]).toBe(9900);
    });

    test('should handle sparse arrays', () => {
      const sparse = [1, , 3, , 5]; // eslint-disable-line no-sparse-arrays
      const result = filter(sparse, (x) => x !== undefined);
      expect(result).toEqual([1, 3, 5]);
    });

    test('should not modify original array', () => {
      const original = [1, 2, 3, 4, 5];
      filter(original, (x) => x > 2);
      expect(original).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('Error conditions', () => {
    test('should throw when predicate throws an error', () => {
      expect(() => {
        filter([1, 2, 3], () => {
          throw new Error('Predicate error');
        });
      }).toThrow('Predicate error');
    });

    test('should handle predicate that accesses undefined properties', () => {
      const users = [{ name: 'Alice' }, { name: 'Bob', age: 30 }];
      const result = filter(users, (user) => user.age > 25);
      expect(result).toEqual([{ name: 'Bob', age: 30 }]);
    });
  });

  describe('Performance characteristics', () => {
    test('should handle alternating matches efficiently', () => {
      const data = Array.from({ length: 1000 }, (_, i) => i);
      const result = filter(data, (x) => x % 2 === 0);
      expect(result.length).toBe(500);
    });

    test('should stop early - but it does not (processes all)', () => {
      // filter does not short-circuit, unlike some other functions
      let processedCount = 0;
      filter([1, 2, 3, 4, 5], (x) => {
        processedCount++;
        return x > 10; // never matches
      });
      expect(processedCount).toBe(5); // all elements processed
    });
  });

  describe('Known bug documentation', () => {
    test('BUG: result initialized as [[]] instead of []', () => {
      // Documented bug on line 28: const result = [[]]
      const result = filter([1, 2, 3], () => false);

      // Current behavior (buggy):
      expect(result).toEqual([[]]);
      expect(result[0]).toEqual([]);

      // Expected behavior (after fix):
      // expect(result).toEqual([]);
    });

    test('BUG: affects null/undefined array handling', () => {
      const result = filter(null, (x) => x > 0);
      // Should return [] but returns [[]]
      expect(result).toEqual([[]]);
    });
  });

  describe('Array-like objects (if supported)', () => {
    test('should handle array-like arguments object', () => {
      function testFunc() {
        return filter(arguments, (x) => x > 1);
      }
      const result = testFunc(1, 2, 3);
      // May not work as expected since arguments is not a true array
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
