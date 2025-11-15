/**
 * Manual Test Suite for filter.js
 * Based on Phase 1 Detailed Test Case Design
 * Total: 15 test cases
 *
 * This test suite was manually designed without AI assistance as per assignment requirements.
 * Test cases are based on black-box testing techniques including:
 * - Equivalence partitioning
 * - Boundary value analysis
 * - E-commerce scenario requirements
 */

import filter from '../../src/filter.js';

describe('filter.js - Manual Test Suite (Phase 1 Design)', () => {

  describe('Basic Filtering Tests', () => {

    test('TC-FILTER-001: Basic Filtering - Positive Test', () => {
      // Purpose: Verify filter returns elements matching predicate
      const input = [1, 2, 3, 4, 5];
      const predicate = (n) => n > 3;
      const result = filter(input, predicate);
      expect(result).toEqual([4, 5]);
    });

    test('TC-FILTER-002: Filter with No Matches', () => {
      // Purpose: Verify behavior when no elements match predicate
      // Known Issue: Due to bug on line 28, may return [[]] instead of []
      const input = [1, 2, 3];
      const predicate = (n) => n > 10;
      const result = filter(input, predicate);

      // This test documents the bug: result[0] will be an empty array
      // Expected (correct) behavior: []
      // Actual behavior due to bug: [[]]
      expect(result.length).toBe(1);
      expect(result[0]).toEqual([]);
    });

    test('TC-FILTER-003: Filter with All Matches', () => {
      // Purpose: Verify behavior when all elements match
      const input = [2, 4, 6, 8];
      const predicate = (n) => n % 2 === 0;
      const result = filter(input, predicate);
      expect(result).toEqual([2, 4, 6, 8]);
    });
  });

  describe('Object Array Filtering (E-commerce Scenarios)', () => {

    test('TC-FILTER-004: Filter with Object Array', () => {
      // Purpose: Verify filtering objects (e-commerce use case)
      const products = [
        { name: 'Tomato', price: 8.50, category: 'Vegetables' },
        { name: 'Bread', price: 3.00, category: 'Bakery' },
        { name: 'Lettuce', price: 2.50, category: 'Vegetables' }
      ];
      const predicate = (product) => product.category === 'Vegetables';
      const result = filter(products, predicate);

      expect(result).toEqual([
        { name: 'Tomato', price: 8.50, category: 'Vegetables' },
        { name: 'Lettuce', price: 2.50, category: 'Vegetables' }
      ]);
    });

    test('TC-FILTER-015: Filter with Price Range (E-commerce Scenario)', () => {
      // Purpose: Verify filtering products by price range
      const products = [
        { name: 'Product A', price: 5.00 },
        { name: 'Product B', price: 15.00 },
        { name: 'Product C', price: 8.50 },
        { name: 'Product D', price: 25.00 }
      ];
      const predicate = (product) => product.price >= 5.00 && product.price <= 10.00;
      const result = filter(products, predicate);

      expect(result).toEqual([
        { name: 'Product A', price: 5.00 },
        { name: 'Product C', price: 8.50 }
      ]);
    });
  });

  describe('Predicate Parameter Validation', () => {

    test('TC-FILTER-005: Predicate with Index Parameter', () => {
      // Purpose: Verify predicate receives correct index
      const input = ['a', 'b', 'c', 'd'];
      const predicate = (value, index) => index % 2 === 0;
      const result = filter(input, predicate);
      expect(result).toEqual(['a', 'c']);
    });

    test('TC-FILTER-006: Predicate with Array Parameter', () => {
      // Purpose: Verify predicate receives original array as third parameter
      const input = [1, 2, 3];
      const predicate = (value, index, arr) => arr.length === 3 && value > 1;
      const result = filter(input, predicate);
      expect(result).toEqual([2, 3]);
    });
  });

  describe('Boundary Value and Edge Cases', () => {

    test('TC-FILTER-007: Empty Array Input', () => {
      // Purpose: Verify behavior with empty array
      const input = [];
      const predicate = (n) => n > 0;
      const result = filter(input, predicate);
      // Bug: returns [[]] instead of []
      expect(result.length).toBe(1);
      expect(result[0]).toEqual([]);
    });

    test('TC-FILTER-008: Null Array Input', () => {
      // Purpose: Verify null handling (line 27 handles null by setting length to 0)
      const input = null;
      const predicate = (n) => n > 0;
      const result = filter(input, predicate);

      // Bug manifests here too: returns [[]] instead of []
      expect(result.length).toBe(1);
      expect(result[0]).toEqual([]);
    });

    test('TC-FILTER-009: Undefined Array Input', () => {
      // Purpose: Verify undefined handling (line 27 handles undefined by setting length to 0)
      const input = undefined;
      const predicate = (n) => n > 0;
      const result = filter(input, predicate);

      // Bug manifests here too: returns [[]] instead of []
      expect(result.length).toBe(1);
      expect(result[0]).toEqual([]);
    });

    test('TC-FILTER-010: Predicate Returns Falsy Values', () => {
      // Purpose: Verify filter excludes elements where predicate returns falsy values
      const input = [1, 2, 3, 4, 5];
      let callCount = 0;
      const predicate = (value) => {
        callCount++;
        if (value === 1) return false;
        if (value === 2) return 0;
        if (value === 3) return null;
        if (value === 4) return undefined;
        if (value === 5) return true;
      };
      const result = filter(input, predicate);
      expect(result).toEqual([5]);
      expect(callCount).toBe(5);
    });

    test('TC-FILTER-012: Array with Mixed Types', () => {
      // Purpose: Verify filtering works with mixed data types
      const input = [1, 'text', null, undefined, {}, [], true];
      const predicate = (value) => typeof value === 'string';
      const result = filter(input, predicate);
      expect(result).toEqual(['text']);
    });
  });

  describe('Error Handling and Side Effects', () => {

    test('TC-FILTER-011: Predicate Throws Exception', () => {
      // Purpose: Verify error handling when predicate throws
      const input = [1, 2, 3];
      const predicate = (n) => { throw new Error('Test error'); };

      // No try-catch in code, exception should propagate
      expect(() => filter(input, predicate)).toThrow('Test error');
    });

    test('TC-FILTER-014: Predicate Modifying Original Array (Anti-pattern)', () => {
      // Purpose: Verify original array modification by predicate (documents behavior)
      const input = [1, 2, 3];
      const predicate = (value, index, arr) => {
        arr[index] = value * 2;
        return value > 1;
      };
      const result = filter(input, predicate);

      // Function doesn't protect against predicate side effects
      // Original array will be modified
      expect(input).toEqual([2, 4, 6]);
      // Result depends on when modification happens - filter checks original values
      expect(result).toEqual([2, 3]);
    });
  });

  describe('Performance Tests', () => {

    test('TC-FILTER-013: Large Array Performance', () => {
      // Purpose: Verify performance with large arrays (e-commerce product catalogs)
      const largeArray = Array.from({ length: 10000 }, (_, i) => i + 1);
      const predicate = (n) => n % 2 === 0;

      const startTime = performance.now();
      const result = filter(largeArray, predicate);
      const endTime = performance.now();

      expect(result.length).toBe(5000);
      expect(result[0]).toBe(2);
      expect(result[result.length - 1]).toBe(10000);

      // Performance should complete in reasonable time (< 100ms)
      const executionTime = endTime - startTime;
      expect(executionTime).toBeLessThan(100);
    });
  });

  describe('Bug Documentation', () => {

    test('BUG: Line 28 - result initialized as [[]] instead of []', () => {
      // This test documents the identified bug in filter.js line 28
      // const result = [[]]  should be  const result = []

      // When no elements match, the function returns [[]] instead of []
      const result = filter([1, 2, 3], (n) => n > 10);

      // Current (buggy) behavior:
      expect(result).toEqual([[]]);
      expect(result.length).toBe(1);
      expect(Array.isArray(result[0])).toBe(true);
      expect(result[0].length).toBe(0);

      // Expected (correct) behavior would be:
      // expect(result).toEqual([]);
      // expect(result.length).toBe(0);
    });
  });
});
