import { test } from '@jest/globals';
import parseFile from '../src/helpers/parseFile.js';

describe('parseFile', () => {
  test('should parse json and yaml files', () => {
    const result1 = {
      host: 'hexlet.io',
      timeout: 50,
      proxy: '123.234.53.22',
      follow: false,
    };

    expect(parseFile('./__fixtures__/file1.json')).toEqual(result1);
    expect(parseFile('./__fixtures__/file1.yaml')).toEqual(result1);

    const result2 = {
      timeout: 20,
      verbose: true,
      host: 'hexlet.io',
    };

    expect(parseFile('./__fixtures__/file2.json')).toEqual(result2);
    expect(parseFile('./__fixtures__/file2.yaml')).toEqual(result2);
  });

  test('should throw an error if the file does not exist', () => {
    expect(() => parseFile('./__fixtures__/not-existing.json')).toThrow();
  });

  test('should throw an error if the file is not a json or yaml file', () => {
    expect(() => parseFile('./__fixtures__/not-json.js')).toThrow();
  });
});
