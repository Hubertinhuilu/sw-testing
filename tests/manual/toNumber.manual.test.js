/**
 * Manual Test Suite for toNumber.js
 * Based on Phase 1 Detailed Test Case Design
 * Total: 50 test cases
 *
 * This test suite was manually designed without AI assistance as per assignment requirements.
 * Test cases cover:
 * - All numeric types and boundary values
 * - String conversions and special formats
 * - Object coercion and type handling
 * - E-commerce price format requirements
 */

import toNumber from '../../src/toNumber.js';

describe('toNumber.js - Manual Test Suite (Phase 1 Design)', () => {

  describe('Number Inputs - Basic Types', () => {

    test('TC-TONUM-001: Number Input - Positive Integer', () => {
      // Purpose: Verify number input returns as-is (fast path, line 45-47)
      expect(toNumber(42)).toBe(42);
    });

    test('TC-TONUM-002: Number Input - Decimal', () => {
      // Purpose: Verify decimal number preserved
      expect(toNumber(3.14159)).toBe(3.14159);
    });

    test('TC-TONUM-003: Number Input - Negative Number', () => {
      // Purpose: Verify negative numbers preserved
      expect(toNumber(-25.5)).toBe(-25.5);
    });

    test('TC-TONUM-004: Number Input - Zero', () => {
      // Purpose: Verify zero is handled correctly (line 56 special case)
      expect(toNumber(0)).toBe(0);
    });

    test('TC-TONUM-005: Number Input - Negative Zero', () => {
      // Purpose: Verify -0 is preserved (JavaScript distinguishes -0 from 0)
      const result = toNumber(-0);
      expect(result).toBe(0);
      expect(Object.is(result, -0)).toBe(true);
    });
  });

  describe('Number Inputs - Special Values', () => {

    test('TC-TONUM-006: Number Input - Infinity', () => {
      // Purpose: Verify Infinity preserved (per code example line 38-39)
      expect(toNumber(Infinity)).toBe(Infinity);
    });

    test('TC-TONUM-007: Number Input - Negative Infinity', () => {
      // Purpose: Verify -Infinity preserved
      expect(toNumber(-Infinity)).toBe(-Infinity);
    });

    test('TC-TONUM-008: Number Input - NaN', () => {
      // Purpose: Verify NaN input returns NaN
      expect(toNumber(NaN)).toBeNaN();
    });

    test('TC-TONUM-009: Number Input - MIN_VALUE', () => {
      // Purpose: Verify smallest positive number (per code example line 35-36)
      expect(toNumber(Number.MIN_VALUE)).toBe(5e-324);
    });

    test('TC-TONUM-010: Number Input - MAX_VALUE', () => {
      // Purpose: Verify largest positive number
      expect(toNumber(Number.MAX_VALUE)).toBe(Number.MAX_VALUE);
    });
  });

  describe('String Inputs - Valid Numbers', () => {

    test('TC-TONUM-011: String Input - Valid Integer String', () => {
      // Purpose: Verify string to number conversion (common in e-commerce forms)
      expect(toNumber("42")).toBe(42);
    });

    test('TC-TONUM-012: String Input - Valid Decimal String', () => {
      // Purpose: Verify decimal string conversion (per code example line 41-42)
      expect(toNumber("3.2")).toBe(3.2);
    });

    test('TC-TONUM-013: String Input - Price Format (Two Decimals)', () => {
      // Purpose: Verify price format conversion (assignment requirement)
      expect(toNumber("12.50")).toBe(12.5);
    });

    test('TC-TONUM-014: String Input - Negative Number String', () => {
      // Purpose: Verify negative string conversion
      expect(toNumber("-15.75")).toBe(-15.75);
    });
  });

  describe('String Inputs - Whitespace Handling', () => {

    test('TC-TONUM-015: String Input - Leading Whitespace', () => {
      // Purpose: Verify whitespace trimming (line 58 regex)
      expect(toNumber("  42")).toBe(42);
    });

    test('TC-TONUM-016: String Input - Trailing Whitespace', () => {
      // Purpose: Verify trailing whitespace trimming
      expect(toNumber("42  ")).toBe(42);
    });

    test('TC-TONUM-017: String Input - Both Leading and Trailing Whitespace', () => {
      // Purpose: Verify complete whitespace trimming (real-world user input)
      expect(toNumber("  12.50  ")).toBe(12.5);
    });

    test('TC-TONUM-018: String Input - Empty String', () => {
      // Purpose: Verify empty string conversion
      expect(toNumber("")).toBe(0);
    });

    test('TC-TONUM-019: String Input - Whitespace Only', () => {
      // Purpose: Verify whitespace-only string (becomes empty string after trim)
      expect(toNumber("   ")).toBe(0);
    });
  });

  describe('String Inputs - Invalid Formats', () => {

    test('TC-TONUM-020: String Input - Invalid Number String', () => {
      // Purpose: Verify invalid string returns NaN
      expect(toNumber("abc")).toBeNaN();
    });

    test('TC-TONUM-021: String Input - Mixed Alphanumeric', () => {
      // Purpose: Verify mixed string returns NaN
      expect(toNumber("12abc34")).toBeNaN();
    });
  });

  describe('String Inputs - Special Formats', () => {

    test('TC-TONUM-022: String Input - Binary Format', () => {
      // Purpose: Verify binary string parsing (line 59-61, base 2)
      expect(toNumber("0b1010")).toBe(10);
    });

    test('TC-TONUM-023: String Input - Octal Format', () => {
      // Purpose: Verify octal string parsing (line 60-61, base 8)
      expect(toNumber("0o17")).toBe(15);
    });

    test('TC-TONUM-024: String Input - Hexadecimal Format (Valid)', () => {
      // Purpose: Verify valid hex string parsing
      expect(toNumber("0xFF")).toBe(255);
    });

    test('TC-TONUM-025: String Input - Bad Hexadecimal (Negative)', () => {
      // Purpose: Verify bad hex returns NaN (line 62, bad hex regex)
      expect(toNumber("-0x123")).toBeNaN();
    });

    test('TC-TONUM-026: String Input - Scientific Notation', () => {
      // Purpose: Verify scientific notation parsing
      expect(toNumber("1.5e3")).toBe(1500);
    });

    test('TC-TONUM-027: String Input - Scientific Notation (Negative Exponent)', () => {
      // Purpose: Verify negative exponent scientific notation
      expect(toNumber("5e-324")).toBe(5e-324);
    });
  });

  describe('Boolean, Null, and Undefined Inputs', () => {

    test('TC-TONUM-028: Boolean Input - True', () => {
      // Purpose: Verify boolean true conversion (line 56, +true = 1)
      expect(toNumber(true)).toBe(1);
    });

    test('TC-TONUM-029: Boolean Input - False', () => {
      // Purpose: Verify boolean false conversion (+false = 0)
      expect(toNumber(false)).toBe(0);
    });

    test('TC-TONUM-030: Null Input', () => {
      // Purpose: Verify null conversion (line 56, +null = 0)
      expect(toNumber(null)).toBe(0);
    });

    test('TC-TONUM-031: Undefined Input', () => {
      // Purpose: Verify undefined conversion (line 56, +undefined = NaN)
      expect(toNumber(undefined)).toBeNaN();
    });
  });

  describe('Symbol Input', () => {

    test('TC-TONUM-032: Symbol Input', () => {
      // Purpose: Verify symbol returns NaN (line 48-50)
      expect(toNumber(Symbol('test'))).toBeNaN();
    });
  });

  describe('Object Inputs - Plain Objects', () => {

    test('TC-TONUM-033: Object Input - Plain Object', () => {
      // Purpose: Verify plain object conversion (becomes "[object Object]" → NaN)
      expect(toNumber({ a: 1 })).toBeNaN();
    });

    test('TC-TONUM-034: Object Input - Object with valueOf Returning Number', () => {
      // Purpose: Verify valueOf() is called (line 52)
      expect(toNumber({ valueOf: () => 42 })).toBe(42);
    });

    test('TC-TONUM-038: Object Input - Object with valueOf Returning String', () => {
      // Purpose: Verify valueOf returning string is parsed
      expect(toNumber({ valueOf: () => "3.14" })).toBe(3.14);
    });

    test('TC-TONUM-039: Object Input - Object with valueOf Returning Object', () => {
      // Purpose: Verify nested object valueOf (line 53, converts to string)
      expect(toNumber({ valueOf: () => ({ nested: true }) })).toBeNaN();
    });
  });

  describe('Object Inputs - Special Object Types', () => {

    test('TC-TONUM-035: Object Input - Date Object', () => {
      // Purpose: Verify Date object conversion (Date.valueOf() returns timestamp)
      const date = new Date('2024-01-01T00:00:00.000Z');
      const timestamp = date.getTime();
      expect(toNumber(date)).toBe(timestamp);
    });

    test('TC-TONUM-036: Object Input - Number Object Wrapper', () => {
      // Purpose: Verify Number object conversion (Number.valueOf() returns primitive)
      expect(toNumber(new Number(25))).toBe(25);
    });

    test('TC-TONUM-037: Object Input - String Object Wrapper', () => {
      // Purpose: Verify String object conversion (String.valueOf() returns "42" → 42)
      expect(toNumber(new String("42"))).toBe(42);
    });
  });

  describe('Array Inputs', () => {

    test('TC-TONUM-040: Array Input - Empty Array', () => {
      // Purpose: Verify empty array conversion ([].toString() = "" → 0)
      expect(toNumber([])).toBe(0);
    });

    test('TC-TONUM-041: Array Input - Single Number Element', () => {
      // Purpose: Verify single-element array ([42].toString() = "42" → 42)
      expect(toNumber([42])).toBe(42);
    });

    test('TC-TONUM-042: Array Input - Multiple Elements', () => {
      // Purpose: Verify multi-element array ([1,2,3].toString() = "1,2,3" → NaN)
      expect(toNumber([1, 2, 3])).toBeNaN();
    });
  });

  describe('Function Input', () => {

    test('TC-TONUM-043: Function Input', () => {
      // Purpose: Verify function conversion (function string representation → NaN)
      expect(toNumber(function() {})).toBeNaN();
    });
  });

  describe('E-commerce Price Formats - Invalid', () => {

    test('TC-TONUM-044: Price with Currency Symbol (Invalid)', () => {
      // Purpose: Verify currency symbols are not parsed (important for validation)
      expect(toNumber("€12.50")).toBeNaN();
    });

    test('TC-TONUM-045: Price with Comma as Decimal Separator (Invalid)', () => {
      // Purpose: Verify European decimal format is not supported
      expect(toNumber("12,50")).toBeNaN();
    });

    test('TC-TONUM-046: Price with Thousand Separators (Invalid)', () => {
      // Purpose: Verify thousand separators are not supported
      expect(toNumber("1,234.56")).toBeNaN();
    });
  });

  describe('Boundary Values - Precision and Limits', () => {

    test('TC-TONUM-047: Very Long Decimal String', () => {
      // Purpose: Verify precision handling (limited by floating point precision)
      const result = toNumber("3.141592653589793238462643383279");
      expect(result).toBeCloseTo(3.141592653589793, 15);
    });

    test('TC-TONUM-048: String Representing MAX_VALUE', () => {
      // Purpose: Verify large number string parsing
      expect(toNumber("1.7976931348623157e+308")).toBe(1.7976931348623157e+308);
    });

    test('TC-TONUM-049: String Exceeding MAX_VALUE', () => {
      // Purpose: Verify overflow handling (values exceeding MAX_VALUE become Infinity)
      expect(toNumber("1e309")).toBe(Infinity);
    });

    test('TC-TONUM-050: Extremely Small Positive Number String', () => {
      // Purpose: Verify underflow handling (values smaller than MIN_VALUE → 0)
      expect(toNumber("1e-400")).toBe(0);
    });
  });
});
