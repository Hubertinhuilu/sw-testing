/**
 * Manual Test Suite for map.js
 * Tests data transformation for display
 * Very frequent use in e-commerce
 */

import map from '../../src/map.js';

describe('map.js - Manual Test Suite', () => {

  describe('Basic Mapping', () => {
    test('should map numbers to their squares', () => {
      function square(n) {
        return n * n;
      }
      expect(map([4, 8], square)).toEqual([16, 64]);
    });

    test('should map with arrow function', () => {
      expect(map([1, 2, 3], n => n * 2)).toEqual([2, 4, 6]);
    });

    test('should map strings to uppercase', () => {
      expect(map(['a', 'b', 'c'], str => str.toUpperCase())).toEqual(['A', 'B', 'C']);
    });
  });

  describe('Iteratee Parameters', () => {
    test('should pass value, index, and array to iteratee', () => {
      const arr = [10, 20, 30];
      const callArgs = [];
      map(arr, (value, index, array) => {
        callArgs.push({ value, index, array });
        return value;
      });

      expect(callArgs.length).toBe(3);
      expect(callArgs[0]).toEqual({ value: 10, index: 0, array: arr });
      expect(callArgs[1]).toEqual({ value: 20, index: 1, array: arr });
      expect(callArgs[2]).toEqual({ value: 30, index: 2, array: arr });
    });

    test('should map using index', () => {
      expect(map(['a', 'b', 'c'], (val, idx) => `${val}${idx}`)).toEqual(['a0', 'b1', 'c2']);
    });
  });

  describe('Edge Cases', () => {
    test('should handle empty array', () => {
      expect(map([], n => n * 2)).toEqual([]);
    });

    test('should handle null array', () => {
      expect(map(null, n => n * 2)).toEqual([]);
    });

    test('should handle undefined array', () => {
      expect(map(undefined, n => n * 2)).toEqual([]);
    });

    test('should handle single element array', () => {
      expect(map([5], n => n * 2)).toEqual([10]);
    });
  });

  describe('E-commerce Scenarios', () => {
    test('should extract product names from cart', () => {
      const cart = [
        { name: 'Tomato', price: 8.50 },
        { name: 'Bread', price: 3.00 },
        { name: 'Lettuce', price: 2.50 }
      ];
      expect(map(cart, item => item.name)).toEqual(['Tomato', 'Bread', 'Lettuce']);
    });

    test('should calculate line totals in cart', () => {
      const cart = [
        { name: 'Tomato', price: 8.50, quantity: 2 },
        { name: 'Bread', price: 3.00, quantity: 1 }
      ];
      const lineTotals = map(cart, item => item.price * item.quantity);
      expect(lineTotals).toEqual([17.00, 3.00]);
    });

    test('should format prices for display', () => {
      const prices = [10.5, 25.0, 5.99];
      const formatted = map(prices, price => `€${price.toFixed(2)}`);
      expect(formatted).toEqual(['€10.50', '€25.00', '€5.99']);
    });

    test('should transform products for display', () => {
      const products = [
        { id: 1, name: 'Tomato', price: 8.50 },
        { id: 2, name: 'Bread', price: 3.00 }
      ];
      const display = map(products, p => ({ label: p.name, value: p.id }));
      expect(display).toEqual([
        { label: 'Tomato', value: 1 },
        { label: 'Bread', value: 2 }
      ]);
    });

    test('should apply discount to all prices', () => {
      const prices = [100, 200, 300];
      const discountedPrices = map(prices, price => price * 0.9);
      expect(discountedPrices).toEqual([90, 180, 270]);
    });
  });

  describe('Return Value', () => {
    test('should create new array, not modify original', () => {
      const original = [1, 2, 3];
      const mapped = map(original, n => n * 2);

      expect(mapped).toEqual([2, 4, 6]);
      expect(original).toEqual([1, 2, 3]);
      expect(mapped).not.toBe(original);
    });

    test('should handle undefined return values', () => {
      expect(map([1, 2, 3], () => undefined)).toEqual([undefined, undefined, undefined]);
    });
  });
});
