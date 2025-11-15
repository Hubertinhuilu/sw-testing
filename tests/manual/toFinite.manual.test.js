/**
 * Manual Test Suite for toFinite.js
 * Tests ensuring finite numbers for price validation
 * Critical for preventing Infinity in calculations
 */

import toFinite from '../../src/toFinite.js';

describe('toFinite.js - Manual Test Suite', () => {

  describe('Number Inputs', () => {
    test('should return number as-is if already finite', () => {
      expect(toFinite(3.2)).toBe(3.2);
    });

    test('should return positive integer as-is', () => {
      expect(toFinite(42)).toBe(42);
    });

    test('should return negative number as-is', () => {
      expect(toFinite(-25)).toBe(-25);
    });

    test('should return zero as-is', () => {
      expect(toFinite(0)).toBe(0);
    });

    test('should preserve negative zero', () => {
      const result = toFinite(-0);
      expect(Object.is(result, -0)).toBe(true);
    });

    test('should return MIN_VALUE as-is', () => {
      expect(toFinite(Number.MIN_VALUE)).toBe(5e-324);
    });
  });

  describe('Infinity Handling', () => {
    test('should convert Infinity to MAX_INTEGER', () => {
      expect(toFinite(Infinity)).toBe(1.7976931348623157e+308);
    });

    test('should convert -Infinity to negative MAX_INTEGER', () => {
      expect(toFinite(-Infinity)).toBe(-1.7976931348623157e+308);
    });
  });

  describe('String Inputs', () => {
    test('should convert string to number', () => {
      expect(toFinite('3.2')).toBe(3.2);
    });

    test('should convert integer string', () => {
      expect(toFinite('42')).toBe(42);
    });

    test('should handle string Infinity', () => {
      expect(toFinite('Infinity')).toBe(1.7976931348623157e+308);
    });

    test('should handle invalid string', () => {
      expect(toFinite('abc')).toBe(0);
    });
  });

  describe('Falsy Values', () => {
    test('should return 0 for null', () => {
      expect(toFinite(null)).toBe(0);
    });

    test('should return 0 for undefined', () => {
      expect(toFinite(undefined)).toBe(0);
    });

    test('should return 0 for false', () => {
      expect(toFinite(false)).toBe(0);
    });

    test('should return 0 for empty string', () => {
      expect(toFinite('')).toBe(0);
    });
  });

  describe('NaN Handling', () => {
    test('should return 0 for NaN', () => {
      expect(toFinite(NaN)).toBe(0);
    });

    test('should return 0 for values that become NaN', () => {
      expect(toFinite('not a number')).toBe(0);
    });
  });

  describe('Boolean and Other Types', () => {
    test('should convert true to 1', () => {
      expect(toFinite(true)).toBe(1);
    });

    test('should handle objects with valueOf', () => {
      expect(toFinite({ valueOf: () => 42 })).toBe(42);
    });

    test('should handle arrays', () => {
      expect(toFinite([42])).toBe(42);
      expect(toFinite([])).toBe(0);
    });
  });

  describe('E-commerce Scenarios', () => {
    test('should validate price is finite', () => {
      const price = toFinite('12.50');
      expect(price).toBe(12.5);
      expect(isFinite(price)).toBe(true);
    });

    test('should prevent Infinity in calculations', () => {
      const invalidPrice = 1 / 0; // Infinity
      const safePrice = toFinite(invalidPrice);
      expect(safePrice).toBe(1.7976931348623157e+308);
      expect(isFinite(safePrice)).toBe(true);
    });

    test('should handle malformed price input', () => {
      const userInput = 'not a price';
      const price = toFinite(userInput);
      expect(price).toBe(0);
    });

    test('should validate quantity is finite', () => {
      const quantity = toFinite('3');
      expect(quantity).toBe(3);
      expect(isFinite(quantity)).toBe(true);
    });

    test('should handle division by zero gracefully', () => {
      const result = toFinite(10 / 0);
      expect(result).toBe(1.7976931348623157e+308);
      expect(result).not.toBe(Infinity);
    });
  });

  describe('Edge Cases', () => {
    test('should handle very large numbers', () => {
      expect(toFinite(1e308)).toBe(1e308);
    });

    test('should handle very small numbers', () => {
      expect(toFinite(1e-308)).toBe(1e-308);
    });

    test('should handle Number objects', () => {
      expect(toFinite(new Number(25))).toBe(25);
    });
  });
});
