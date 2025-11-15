/**
 * Manual Test Suite for isEmpty.js
 * Tests validation across multiple data types
 * Critical for e-commerce input validation
 */

import isEmpty from '../../src/isEmpty.js';

describe('isEmpty.js - Manual Test Suite', () => {

  describe('Null and Undefined', () => {
    test('should return true for null', () => {
      expect(isEmpty(null)).toBe(true);
    });

    test('should return true for undefined', () => {
      expect(isEmpty(undefined)).toBe(true);
    });
  });

  describe('Primitive Values', () => {
    test('should return true for boolean true', () => {
      expect(isEmpty(true)).toBe(true);
    });

    test('should return true for boolean false', () => {
      expect(isEmpty(false)).toBe(true);
    });

    test('should return true for numbers', () => {
      expect(isEmpty(1)).toBe(true);
      expect(isEmpty(0)).toBe(true);
      expect(isEmpty(-1)).toBe(true);
    });
  });

  describe('Arrays', () => {
    test('should return true for empty array', () => {
      expect(isEmpty([])).toBe(true);
    });

    test('should return false for non-empty array', () => {
      expect(isEmpty([1, 2, 3])).toBe(false);
    });

    test('should return false for array with single element', () => {
      expect(isEmpty([1])).toBe(false);
    });
  });

  describe('Strings', () => {
    test('should return true for empty string', () => {
      expect(isEmpty('')).toBe(true);
    });

    test('should return false for non-empty string', () => {
      expect(isEmpty('abc')).toBe(false);
    });

    test('should return false for whitespace string', () => {
      expect(isEmpty('  ')).toBe(false);
    });
  });

  describe('Objects', () => {
    test('should return true for empty object', () => {
      expect(isEmpty({})).toBe(true);
    });

    test('should return false for object with properties', () => {
      expect(isEmpty({ a: 1 })).toBe(false);
    });

    test('should return false for object with nested properties', () => {
      expect(isEmpty({ a: { b: 1 } })).toBe(false);
    });
  });

  describe('Maps and Sets', () => {
    test('should return true for empty Map', () => {
      expect(isEmpty(new Map())).toBe(true);
    });

    test('should return false for non-empty Map', () => {
      const map = new Map();
      map.set('key', 'value');
      expect(isEmpty(map)).toBe(false);
    });

    test('should return true for empty Set', () => {
      expect(isEmpty(new Set())).toBe(true);
    });

    test('should return false for non-empty Set', () => {
      const set = new Set();
      set.add(1);
      expect(isEmpty(set)).toBe(false);
    });
  });

  describe('E-commerce Scenarios', () => {
    test('should validate empty shopping cart (empty array)', () => {
      const cart = [];
      expect(isEmpty(cart)).toBe(true);
    });

    test('should validate non-empty shopping cart', () => {
      const cart = [{ product: 'Tomato', price: 8.50 }];
      expect(isEmpty(cart)).toBe(false);
    });

    test('should validate empty product search results', () => {
      const searchResults = [];
      expect(isEmpty(searchResults)).toBe(true);
    });

    test('should validate empty form field (empty string)', () => {
      const formField = '';
      expect(isEmpty(formField)).toBe(true);
    });
  });
});
