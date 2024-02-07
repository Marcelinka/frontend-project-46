import sortBy from 'lodash/sortBy.js';
import union from 'lodash/union.js';
import has from 'lodash/has.js';
import isObject from 'lodash/isObject.js';

export default function findDiff(obj1, obj2, offset = 4) {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  const unionKeys = sortBy(union(obj1Keys, obj2Keys));

  const result = ['{\n'];

  result.push(
    ...unionKeys.map((key) => {
      let str = '';

      if (isObject(obj1[key]) || isObject(obj2[key])) {
        if (isObject(obj1[key]) && isObject(obj2[key])) {
          str += `${' '.repeat(offset)}${key}: ${findDiff(obj1[key], obj2[key], offset + 4)}\n`;
          return str;
        }

        if (isObject(obj1[key]) && has(obj2, key)) {
          str += `${' '.repeat(offset - 2)}- ${key}: ${findDiff(obj1[key], obj1[key], offset + 4)}\n`;
          str += `${' '.repeat(offset - 2)}+ ${key}: ${obj2[key]}\n`;
          return str;
        }

        if (has(obj1, key) && isObject(obj2[key])) {
          str += `${' '.repeat(offset - 2)}- ${key}: ${obj1[key]}\n`;
          str += `${' '.repeat(offset - 2)}+ ${key}: ${findDiff(obj2[key], obj2[key], offset + 4)}\n`;
          return str;
        }

        if (has(obj1, key)) {
          str += `${' '.repeat(offset - 2)}- ${key}: ${findDiff(obj1[key], obj1[key], offset + 4)}\n`;
          return str;
        }

        return `${' '.repeat(offset - 2)}+ ${key}: ${findDiff(obj2[key], obj2[key], offset + 4)}\n`;
      }

      if (obj1[key] !== obj2[key]) {
        if (has(obj1, key)) {
          str += `${' '.repeat(offset - 2)}- ${key}: ${obj1[key]}\n`;
        }

        if (has(obj2, key)) {
          str += `${' '.repeat(offset - 2)}+ ${key}: ${obj2[key]}\n`;
        }

        return str;
      }

      return `${' '.repeat(offset)}${key}: ${obj1[key]}\n`;
    }),
  );

  result.push(`${' '.repeat(offset - 4)}}`);

  return result.join('');
}
