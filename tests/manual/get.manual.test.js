/**
 * Manual Test Suite for get.js
 * Tests safe nested property access
 * Prevents crashes from undefined values in e-commerce data
 */

import get from '../../src/get.js';

describe('get.js - Manual Test Suite', () => {

  describe('Basic Property Access', () => {
    test('should get shallow property', () => {
      const obj = { a: 1 };
      expect(get(obj, 'a')).toBe(1);
    });

    test('should get nested property with dot notation', () => {
      const obj = { a: { b: { c: 3 } } };
      expect(get(obj, 'a.b.c')).toBe(3);
    });

    test('should get nested property with array notation', () => {
      const obj = { a: [{ b: { c: 3 } }] };
      expect(get(obj, 'a[0].b.c')).toBe(3);
    });

    test('should get property using array path', () => {
      const obj = { a: [{ b: { c: 3 } }] };
      expect(get(obj, ['a', '0', 'b', 'c'])).toBe(3);
    });
  });

  describe('Default Value Handling', () => {
    test('should return default value for undefined property', () => {
      const obj = { a: 1 };
      expect(get(obj, 'b', 'default')).toBe('default');
    });

    test('should return default value for null object', () => {
      expect(get(null, 'a.b.c', 'default')).toBe('default');
    });

    test('should return default value for undefined object', () => {
      expect(get(undefined, 'a.b.c', 'default')).toBe('default');
    });

    test('should return undefined if no default value provided', () => {
      const obj = { a: 1 };
      expect(get(obj, 'b')).toBeUndefined();
    });
  });

  describe('E-commerce Scenarios', () => {
    test('should safely access nested product properties', () => {
      const product = {
        name: 'Tomato',
        details: {
          price: 8.50,
          category: 'Vegetables'
        }
      };
      expect(get(product, 'details.price')).toBe(8.50);
    });

    test('should return default for missing optional properties', () => {
      const product = { name: 'Tomato' };
      expect(get(product, 'details.discount', 0)).toBe(0);
    });

    test('should safely access array of products', () => {
      const cart = {
        items: [
          { name: 'Tomato', price: 8.50 },
          { name: 'Bread', price: 3.00 }
        ]
      };
      expect(get(cart, 'items[1].price')).toBe(3.00);
    });

    test('should handle missing cart items gracefully', () => {
      const cart = { items: [] };
      expect(get(cart, 'items[0].price', 0)).toBe(0);
    });
  });

  describe('Edge Cases', () => {
    test('should handle null values in path', () => {
      const obj = { a: null };
      expect(get(obj, 'a.b', 'default')).toBe('default');
    });

    test('should get falsy values that exist', () => {
      const obj = { a: 0, b: false, c: '' };
      expect(get(obj, 'a')).toBe(0);
      expect(get(obj, 'b')).toBe(false);
      expect(get(obj, 'c')).toBe('');
    });
  });
});
