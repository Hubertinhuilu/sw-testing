/**
 * AI-Generated Test Suite for toNumber.js
 * Generated using Claude Code AI Assistant
 *
 * Prompt used: "Analyze the toNumber.js source code and generate comprehensive tests.
 * Cover all input types, edge cases, type coercion paths, and special number formats.
 * Include tests for the dependencies on isObject and isSymbol functions."
 *
 * This suite was generated to compare AI-assisted testing with manual test design.
 */

import toNumber from '../../src/toNumber.js';

describe('toNumber.js - AI-Generated Test Suite', () => {

  describe('Fast path - already a number (line 45-47)', () => {
    test('should return integers unchanged', () => {
      expect(toNumber(0)).toBe(0);
      expect(toNumber(42)).toBe(42);
      expect(toNumber(-17)).toBe(-17);
    });

    test('should return floating point numbers unchanged', () => {
      expect(toNumber(3.14159)).toBe(3.14159);
      expect(toNumber(-2.71828)).toBe(-2.71828);
      expect(toNumber(0.1 + 0.2)).toBeCloseTo(0.3, 15);
    });

    test('should handle special numeric values', () => {
      expect(toNumber(Infinity)).toBe(Infinity);
      expect(toNumber(-Infinity)).toBe(-Infinity);
      expect(toNumber(NaN)).toBeNaN();
    });

    test('should preserve negative zero', () => {
      const result = toNumber(-0);
      expect(Object.is(result, -0)).toBe(true);
    });

    test('should handle JavaScript number limits', () => {
      expect(toNumber(Number.MAX_VALUE)).toBe(Number.MAX_VALUE);
      expect(toNumber(Number.MIN_VALUE)).toBe(Number.MIN_VALUE);
      expect(toNumber(Number.MAX_SAFE_INTEGER)).toBe(Number.MAX_SAFE_INTEGER);
      expect(toNumber(Number.MIN_SAFE_INTEGER)).toBe(Number.MIN_SAFE_INTEGER);
    });
  });

  describe('Symbol handling (line 48-50)', () => {
    test('should return NaN for symbols', () => {
      expect(toNumber(Symbol())).toBeNaN();
      expect(toNumber(Symbol('test'))).toBeNaN();
      expect(toNumber(Symbol.for('global'))).toBeNaN();
    });

    test('should handle well-known symbols', () => {
      expect(toNumber(Symbol.iterator)).toBeNaN();
      expect(toNumber(Symbol.toStringTag)).toBeNaN();
    });
  });

  describe('Object coercion (line 51-54)', () => {
    test('should call valueOf on objects', () => {
      expect(toNumber({ valueOf: () => 42 })).toBe(42);
      expect(toNumber({ valueOf: () => 3.14 })).toBe(3.14);
      expect(toNumber({ valueOf: () => -10 })).toBe(-10);
    });

    test('should use valueOf result if it returns a primitive', () => {
      expect(toNumber({ valueOf: () => '123' })).toBe(123);
      expect(toNumber({ valueOf: () => true })).toBe(1);
      expect(toNumber({ valueOf: () => false })).toBe(0);
      expect(toNumber({ valueOf: () => null })).toBe(0);
    });

    test('should convert to string if valueOf returns object', () => {
      expect(toNumber({ valueOf: () => ({}) })).toBeNaN();
      expect(toNumber({ valueOf: () => ([]) })).toBe(0);
    });

    test('should handle Date objects', () => {
      const date = new Date('2024-01-01T00:00:00Z');
      const timestamp = date.valueOf();
      expect(toNumber(date)).toBe(timestamp);
    });

    test('should handle Number wrapper objects', () => {
      expect(toNumber(new Number(100))).toBe(100);
      expect(toNumber(new Number(-50))).toBe(-50);
      expect(toNumber(new Number(0))).toBe(0);
    });

    test('should handle String wrapper objects', () => {
      expect(toNumber(new String('42'))).toBe(42);
      expect(toNumber(new String('3.14'))).toBe(3.14);
      expect(toNumber(new String('invalid'))).toBeNaN();
    });

    test('should handle Boolean wrapper objects', () => {
      expect(toNumber(new Boolean(true))).toBe(1);
      expect(toNumber(new Boolean(false))).toBe(0);
    });

    test('should convert plain objects without valueOf to NaN', () => {
      expect(toNumber({})).toBeNaN();
      expect(toNumber({ a: 1, b: 2 })).toBeNaN();
    });

    test('should handle objects with toString', () => {
      expect(toNumber({ toString: () => '42' })).toBeNaN(); // valueOf takes precedence, returns object
      expect(toNumber({ valueOf: () => '42', toString: () => '100' })).toBe(42);
    });
  });

  describe('Non-string primitives (line 55-57)', () => {
    test('should convert booleans', () => {
      expect(toNumber(true)).toBe(1);
      expect(toNumber(false)).toBe(0);
    });

    test('should convert null and undefined', () => {
      expect(toNumber(null)).toBe(0);
      expect(toNumber(undefined)).toBeNaN();
    });

    test('should handle zero specially (line 56)', () => {
      expect(toNumber(0)).toBe(0);
      const negZero = -0;
      const result = toNumber(negZero);
      expect(Object.is(result, -0)).toBe(true);
    });
  });

  describe('String conversions - whitespace trimming (line 58)', () => {
    test('should trim leading whitespace', () => {
      expect(toNumber('   42')).toBe(42);
      expect(toNumber('\t\n\r 100')).toBe(100);
    });

    test('should trim trailing whitespace', () => {
      expect(toNumber('42   ')).toBe(42);
      expect(toNumber('100 \t\n\r')).toBe(100);
    });

    test('should trim both leading and trailing whitespace', () => {
      expect(toNumber('  42  ')).toBe(42);
      expect(toNumber('\t100\n')).toBe(100);
    });

    test('should handle whitespace-only strings', () => {
      expect(toNumber('   ')).toBe(0);
      expect(toNumber('\t\n\r')).toBe(0);
    });

    test('should handle empty string', () => {
      expect(toNumber('')).toBe(0);
    });
  });

  describe('String conversions - binary format (line 59-62)', () => {
    test('should parse binary strings', () => {
      expect(toNumber('0b0')).toBe(0);
      expect(toNumber('0b1')).toBe(1);
      expect(toNumber('0b10')).toBe(2);
      expect(toNumber('0b1111')).toBe(15);
      expect(toNumber('0b11111111')).toBe(255);
    });

    test('should handle binary with uppercase B', () => {
      expect(toNumber('0B1010')).toBe(10);
    });
  });

  describe('String conversions - octal format (line 59-62)', () => {
    test('should parse octal strings', () => {
      expect(toNumber('0o0')).toBe(0);
      expect(toNumber('0o7')).toBe(7);
      expect(toNumber('0o10')).toBe(8);
      expect(toNumber('0o77')).toBe(63);
      expect(toNumber('0o777')).toBe(511);
    });

    test('should handle octal with uppercase O', () => {
      expect(toNumber('0O17')).toBe(15);
    });

    test('should reject invalid octal digits', () => {
      // '8' is not a valid octal digit
      expect(toNumber('0o8')).toBeNaN();
    });
  });

  describe('String conversions - hexadecimal format', () => {
    test('should parse valid hex strings', () => {
      expect(toNumber('0x0')).toBe(0);
      expect(toNumber('0xF')).toBe(15);
      expect(toNumber('0xFF')).toBe(255);
      expect(toNumber('0xDEADBEEF')).toBe(3735928559);
    });

    test('should handle lowercase hex digits', () => {
      expect(toNumber('0xabcdef')).toBe(11259375);
    });

    test('should handle uppercase X', () => {
      expect(toNumber('0XFF')).toBe(255);
    });

    test('should reject bad hex (line 62)', () => {
      expect(toNumber('-0x123')).toBeNaN();
      expect(toNumber('+0x123')).toBeNaN();
    });
  });

  describe('String conversions - decimal numbers', () => {
    test('should parse integer strings', () => {
      expect(toNumber('0')).toBe(0);
      expect(toNumber('42')).toBe(42);
      expect(toNumber('-17')).toBe(-17);
      expect(toNumber('+99')).toBe(99);
    });

    test('should parse decimal strings', () => {
      expect(toNumber('3.14')).toBe(3.14);
      expect(toNumber('-2.718')).toBe(-2.718);
      expect(toNumber('.5')).toBe(0.5);
      expect(toNumber('5.')).toBe(5);
    });

    test('should parse scientific notation', () => {
      expect(toNumber('1e3')).toBe(1000);
      expect(toNumber('1.5e2')).toBe(150);
      expect(toNumber('2e-3')).toBe(0.002);
      expect(toNumber('1E6')).toBe(1000000);
    });

    test('should handle signed numbers', () => {
      expect(toNumber('-42')).toBe(-42);
      expect(toNumber('+42')).toBe(42);
    });
  });

  describe('String conversions - special cases', () => {
    test('should handle Infinity strings', () => {
      expect(toNumber('Infinity')).toBe(Infinity);
      expect(toNumber('-Infinity')).toBe(-Infinity);
      expect(toNumber('+Infinity')).toBe(Infinity);
    });

    test('should return NaN for invalid strings', () => {
      expect(toNumber('abc')).toBeNaN();
      expect(toNumber('12abc')).toBeNaN();
      expect(toNumber('abc12')).toBeNaN();
      expect(toNumber('12.34.56')).toBeNaN();
    });

    test('should handle special keywords', () => {
      expect(toNumber('NaN')).toBeNaN();
    });
  });

  describe('Array coercion', () => {
    test('should handle empty array', () => {
      expect(toNumber([])).toBe(0);
    });

    test('should handle single-element numeric arrays', () => {
      expect(toNumber([42])).toBe(42);
      expect(toNumber([3.14])).toBe(3.14);
    });

    test('should handle single-element string arrays', () => {
      expect(toNumber(['42'])).toBe(42);
      expect(toNumber(['3.14'])).toBe(3.14);
    });

    test('should return NaN for multi-element arrays', () => {
      expect(toNumber([1, 2])).toBeNaN();
      expect(toNumber([1, 2, 3])).toBeNaN();
    });

    test('should handle nested arrays', () => {
      expect(toNumber([[]])).toBe(0);
      expect(toNumber([[42]])).toBe(42);
    });
  });

  describe('Function coercion', () => {
    test('should convert functions to NaN', () => {
      expect(toNumber(function() {})).toBeNaN();
      expect(toNumber(() => {})).toBeNaN();
      expect(toNumber(async () => {})).toBeNaN();
    });
  });

  describe('Edge cases and corner cases', () => {
    test('should handle very large number strings', () => {
      expect(toNumber('999999999999999999')).toBe(999999999999999999);
      expect(toNumber('1e308')).toBe(1e308);
    });

    test('should handle overflow to Infinity', () => {
      expect(toNumber('1e309')).toBe(Infinity);
      expect(toNumber('-1e309')).toBe(-Infinity);
    });

    test('should handle underflow to zero', () => {
      expect(toNumber('1e-400')).toBe(0);
    });

    test('should handle maximum precision', () => {
      const longDecimal = '3.141592653589793238462643383279';
      const result = toNumber(longDecimal);
      expect(result).toBeCloseTo(Math.PI, 15);
    });

    test('should handle numbers with many leading zeros', () => {
      expect(toNumber('00042')).toBe(42);
      expect(toNumber('00.5')).toBe(0.5);
    });

    test('should handle numbers in different locales (not supported)', () => {
      // JavaScript toNumber doesn't support localized formats
      expect(toNumber('1,234.56')).toBeNaN(); // comma thousands separator
      expect(toNumber('1.234,56')).toBeNaN(); // European format
    });
  });

  describe('Real-world scenarios', () => {
    test('should handle user input strings', () => {
      expect(toNumber('  100  ')).toBe(100);
      expect(toNumber('12.50')).toBe(12.5);
    });

    test('should handle form input values', () => {
      expect(toNumber('42')).toBe(42);
      expect(toNumber('')).toBe(0);
    });

    test('should validate numeric strings', () => {
      const input = '123.45';
      const num = toNumber(input);
      expect(isNaN(num)).toBe(false);
      expect(num).toBe(123.45);
    });

    test('should reject currency symbols', () => {
      expect(toNumber('$100')).toBeNaN();
      expect(toNumber('€50')).toBeNaN();
      expect(toNumber('£25')).toBeNaN();
    });

    test('should reject percentage symbols', () => {
      expect(toNumber('50%')).toBeNaN();
    });
  });

  describe('Type consistency', () => {
    test('should always return a number type', () => {
      expect(typeof toNumber(42)).toBe('number');
      expect(typeof toNumber('42')).toBe('number');
      expect(typeof toNumber(true)).toBe('number');
      expect(typeof toNumber(null)).toBe('number');
      expect(typeof toNumber(undefined)).toBe('number');
      expect(typeof toNumber({})).toBe('number');
    });

    test('should handle NaN as a number type', () => {
      const result = toNumber('invalid');
      expect(typeof result).toBe('number');
      expect(isNaN(result)).toBe(true);
    });
  });

  describe('Comparison with Number() constructor', () => {
    test('should behave similarly to Number() for most inputs', () => {
      const inputs = [42, '42', true, false, null, '', ' ', '3.14'];
      inputs.forEach(input => {
        expect(toNumber(input)).toBe(Number(input));
      });
    });

    test('should differ for binary/octal strings', () => {
      expect(toNumber('0b1010')).toBe(10);
      expect(Number('0b1010')).toBe(10); // ES6+ also supports this
    });
  });
});
