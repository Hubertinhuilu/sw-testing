/**
 * Manual Test Suite for toString.js
 * Tests string conversion foundation
 * Used everywhere for display in e-commerce
 */

import toString from '../../src/toString.js';

describe('toString.js - Manual Test Suite', () => {

  describe('Null and Undefined', () => {
    test('should return string "null" for null (documentation says empty string)', () => {
      // NOTE: Documentation (line 7) says empty string should be returned,
      // but actual implementation returns "null"
      expect(toString(null)).toBe('null');
    });

    test('should return string "undefined" for undefined (documentation says empty string)', () => {
      // NOTE: Documentation (line 8) says empty string should be returned,
      // but actual implementation returns "undefined"
      expect(toString(undefined)).toBe('undefined');
    });
  });

  describe('String Inputs', () => {
    test('should return string as-is', () => {
      expect(toString('hello')).toBe('hello');
    });

    test('should return empty string as-is', () => {
      expect(toString('')).toBe('');
    });
  });

  describe('Number Inputs', () => {
    test('should convert positive number to string', () => {
      expect(toString(42)).toBe('42');
    });

    test('should convert decimal to string', () => {
      expect(toString(3.14)).toBe('3.14');
    });

    test('should convert negative number to string', () => {
      expect(toString(-25)).toBe('-25');
    });

    test('should preserve -0 sign', () => {
      expect(toString(-0)).toBe('-0');
    });

    test('should convert zero to string', () => {
      expect(toString(0)).toBe('0');
    });

    test('should convert Infinity', () => {
      expect(toString(Infinity)).toBe('Infinity');
    });

    test('should convert NaN', () => {
      expect(toString(NaN)).toBe('NaN');
    });
  });

  describe('Array Inputs', () => {
    test('should convert array to comma-separated string', () => {
      expect(toString([1, 2, 3])).toBe('1,2,3');
    });

    test('should handle empty array', () => {
      expect(toString([])).toBe('');
    });

    test('should handle nested arrays', () => {
      expect(toString([1, [2, 3], 4])).toBe('1,2,3,4');
    });

    test('should handle array with null/undefined', () => {
      expect(toString([1, null, 3, undefined, 5])).toBe('1,,3,,5');
    });
  });

  describe('Boolean Inputs', () => {
    test('should convert true to string', () => {
      expect(toString(true)).toBe('true');
    });

    test('should convert false to string', () => {
      expect(toString(false)).toBe('false');
    });
  });

  describe('Object Inputs', () => {
    test('should convert plain object', () => {
      expect(toString({ a: 1 })).toBe('[object Object]');
    });

    test('should convert Date object', () => {
      const date = new Date('2024-01-01T00:00:00.000Z');
      const result = toString(date);
      expect(result).toContain('2024');
    });
  });

  describe('Symbol Inputs', () => {
    test('should convert symbol to string', () => {
      const sym = Symbol('test');
      expect(toString(sym)).toBe('Symbol(test)');
    });
  });

  describe('E-commerce Scenarios', () => {
    test('should convert price for display', () => {
      expect(toString(12.50)).toBe('12.5');
    });

    test('should convert product quantity', () => {
      expect(toString(3)).toBe('3');
    });

    test('should handle product name (already string)', () => {
      expect(toString('Fresh Tomatoes')).toBe('Fresh Tomatoes');
    });

    test('should convert product array for display', () => {
      const categories = ['Vegetables', 'Bakery', 'Dairy'];
      expect(toString(categories)).toBe('Vegetables,Bakery,Dairy');
    });
  });
});
