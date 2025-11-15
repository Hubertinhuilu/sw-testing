/**
 * Manual Test Suite for reduce.js
 * Tests cart total calculations
 * High financial impact if bugs exist
 */

import reduce from '../../src/reduce.js';

describe('reduce.js - Manual Test Suite', () => {

  describe('Basic Array Reduction', () => {
    test('should sum array of numbers with initial value', () => {
      expect(reduce([1, 2], (sum, n) => sum + n, 0)).toBe(3);
    });

    test('should sum array without initial value', () => {
      expect(reduce([1, 2, 3], (sum, n) => sum + n)).toBe(6);
    });

    test('should multiply numbers', () => {
      expect(reduce([2, 3, 4], (product, n) => product * n, 1)).toBe(24);
    });

    test('should concatenate strings', () => {
      expect(reduce(['a', 'b', 'c'], (str, char) => str + char, '')).toBe('abc');
    });
  });

  describe('Object Reduction', () => {
    test('should group values by key', () => {
      const result = reduce({ 'a': 1, 'b': 2, 'c': 1 }, (result, value, key) => {
        (result[value] || (result[value] = [])).push(key);
        return result;
      }, {});

      expect(result[1]).toContain('a');
      expect(result[1]).toContain('c');
      expect(result[2]).toContain('b');
    });
  });

  describe('E-commerce Scenarios', () => {
    test('should calculate shopping cart total', () => {
      const cart = [
        { name: 'Tomato', price: 8.50, quantity: 2 },
        { name: 'Bread', price: 3.00, quantity: 1 },
        { name: 'Lettuce', price: 2.50, quantity: 3 }
      ];
      const total = reduce(cart, (sum, item) => sum + (item.price * item.quantity), 0);
      expect(total).toBe(27.50);
    });

    test('should calculate total with two decimal precision', () => {
      const cart = [
        { price: 10.55, quantity: 2 },
        { price: 5.99, quantity: 3 }
      ];
      const total = reduce(cart, (sum, item) => sum + (item.price * item.quantity), 0);
      expect(total).toBeCloseTo(39.07, 2);
    });

    test('should count products by category', () => {
      const products = [
        { category: 'Vegetables', name: 'Tomato' },
        { category: 'Bakery', name: 'Bread' },
        { category: 'Vegetables', name: 'Lettuce' }
      ];
      const counts = reduce(products, (acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      }, {});

      expect(counts.Vegetables).toBe(2);
      expect(counts.Bakery).toBe(1);
    });

    test('should calculate weighted average price', () => {
      const items = [
        { price: 10, quantity: 2 },
        { price: 20, quantity: 3 }
      ];
      const totalValue = reduce(items, (sum, item) => sum + (item.price * item.quantity), 0);
      const totalQuantity = reduce(items, (sum, item) => sum + item.quantity, 0);
      const averagePrice = totalValue / totalQuantity;

      expect(averagePrice).toBe(16);
    });
  });

  describe('Edge Cases', () => {
    test('should handle empty array with initial value', () => {
      expect(reduce([], (sum, n) => sum + n, 0)).toBe(0);
    });

    test('should handle single element array', () => {
      expect(reduce([42], (sum, n) => sum + n, 0)).toBe(42);
    });

    test('should handle single element without initial value', () => {
      expect(reduce([42], (sum, n) => sum + n)).toBe(42);
    });
  });

  describe('Iteratee Parameters', () => {
    test('should pass accumulator, value, index, and collection', () => {
      const array = [1, 2, 3];
      const mockIteratee = jest.fn((acc, val) => acc + val);
      reduce(array, mockIteratee, 0);

      expect(mockIteratee).toHaveBeenCalledTimes(3);
      expect(mockIteratee).toHaveBeenCalledWith(0, 1, 0, array);
    });
  });
});
