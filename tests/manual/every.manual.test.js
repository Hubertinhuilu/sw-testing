/**
 * Manual Test Suite for every.js
 * Tests validation that all items meet criteria
 * Critical for cart and form validation
 */

import every from '../../src/every.js';

describe('every.js - Manual Test Suite', () => {

  describe('Basic Validation', () => {
    test('should return true when all elements pass predicate', () => {
      expect(every([2, 4, 6, 8], n => n % 2 === 0)).toBe(true);
    });

    test('should return false when one element fails predicate', () => {
      expect(every([2, 4, 5, 8], n => n % 2 === 0)).toBe(false);
    });

    test('should return false when first element fails', () => {
      expect(every([1, 2, 4, 8], n => n % 2 === 0)).toBe(false);
    });

    test('should return false when last element fails', () => {
      expect(every([2, 4, 8, 9], n => n % 2 === 0)).toBe(false);
    });
  });

  describe('Empty Array and Vacuous Truth', () => {
    test('should return true for empty array (vacuous truth)', () => {
      expect(every([], n => n > 10)).toBe(true);
    });

    test('should handle null array', () => {
      expect(every(null, n => n > 0)).toBe(true);
    });

    test('should handle undefined array', () => {
      expect(every(undefined, n => n > 0)).toBe(true);
    });
  });

  describe('Predicate Parameters', () => {
    test('should pass value, index, and array to predicate', () => {
      const arr = [1, 2, 3];
      const mockPredicate = jest.fn(() => true);
      every(arr, mockPredicate);

      expect(mockPredicate).toHaveBeenCalledTimes(3);
      expect(mockPredicate).toHaveBeenCalledWith(1, 0, arr);
      expect(mockPredicate).toHaveBeenCalledWith(2, 1, arr);
      expect(mockPredicate).toHaveBeenCalledWith(3, 2, arr);
    });

    test('should stop iteration on first false', () => {
      const mockPredicate = jest.fn((n) => n < 3);
      every([1, 2, 3, 4, 5], mockPredicate);

      // Should only be called 3 times (1, 2, 3) then stop
      expect(mockPredicate).toHaveBeenCalledTimes(3);
    });
  });

  describe('E-commerce Scenarios', () => {
    test('should validate all cart items have required fields', () => {
      const cart = [
        { name: 'Tomato', price: 8.50, quantity: 2 },
        { name: 'Bread', price: 3.00, quantity: 1 }
      ];
      expect(every(cart, item => item.price > 0 && item.quantity > 0)).toBe(true);
    });

    test('should detect invalid cart items', () => {
      const cart = [
        { name: 'Tomato', price: 8.50, quantity: 2 },
        { name: 'Invalid', price: 0, quantity: 1 }
      ];
      expect(every(cart, item => item.price > 0)).toBe(false);
    });

    test('should validate all products are in stock', () => {
      const products = [
        { name: 'Tomato', inStock: true },
        { name: 'Bread', inStock: true }
      ];
      expect(every(products, product => product.inStock)).toBe(true);
    });

    test('should validate form fields are not empty', () => {
      const formFields = ['John Doe', 'john@example.com', '123 Main St'];
      expect(every(formFields, field => field && field.length > 0)).toBe(true);
    });

    test('should validate all prices are valid numbers', () => {
      const prices = [10.50, 25.00, 5.99];
      expect(every(prices, price => !isNaN(price) && price > 0)).toBe(true);
    });
  });

  describe('Truthy/Falsy Handling', () => {
    test('should handle Boolean as predicate (from example)', () => {
      expect(every([true, 1, null, 'yes'], Boolean)).toBe(false);
    });

    test('should handle falsy values correctly', () => {
      expect(every([0, false, null], val => !val)).toBe(true);
    });
  });
});
