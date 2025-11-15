/**
 * Manual Test Suite for words.js
 * Tests text parsing for search and validation
 * Required for first-word capitalization validation
 */

import words from '../../src/words.js';

describe('words.js - Manual Test Suite', () => {

  describe('Basic Word Extraction', () => {
    test('should split simple sentence into words', () => {
      expect(words('fred, barney, & pebbles')).toEqual(['fred', 'barney', 'pebbles']);
    });

    test('should handle single word', () => {
      expect(words('hello')).toEqual(['hello']);
    });

    test('should return empty array for empty string', () => {
      expect(words('')).toEqual([]);
    });

    test('should handle words with numbers', () => {
      // Words splits on number/letter boundaries
      expect(words('item123 product456')).toEqual(['item', '123', 'product', '456']);
    });
  });

  describe('Custom Pattern', () => {
    test('should use custom pattern to match words', () => {
      expect(words('fred, barney, & pebbles', /[^, ]+/g)).toEqual(['fred', 'barney', '&', 'pebbles']);
    });

    test('should match email-like patterns', () => {
      expect(words('user@example.com', /\S+/g)).toEqual(['user@example.com']);
    });
  });

  describe('E-commerce Scenarios', () => {
    test('should extract words from product name', () => {
      expect(words('Fresh Organic Tomatoes')).toEqual(['Fresh', 'Organic', 'Tomatoes']);
    });

    test('should validate first word for capitalization', () => {
      const productName = 'Fresh Organic Tomatoes';
      const wordList = words(productName);
      expect(wordList[0]).toBe('Fresh');
      expect(wordList[0][0]).toBe(wordList[0][0].toUpperCase());
    });

    test('should extract search keywords', () => {
      const searchQuery = 'organic vegetables fresh';
      expect(words(searchQuery)).toEqual(['organic', 'vegetables', 'fresh']);
    });

    test('should handle product codes with mixed characters', () => {
      expect(words('PROD-123-ABC')).toEqual(['PROD', '123', 'ABC']);
    });
  });

  describe('Edge Cases', () => {
    test('should handle multiple spaces', () => {
      expect(words('hello    world')).toEqual(['hello', 'world']);
    });

    test('should handle special characters', () => {
      expect(words('hello-world test_case')).toEqual(['hello', 'world', 'test', 'case']);
    });

    test('should handle camelCase', () => {
      const result = words('helloWorld');
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
