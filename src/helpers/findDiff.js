import sortBy from 'lodash/sortBy.js';
import union from 'lodash/union.js';
import isObject from 'lodash/isObject.js';
import intersection from 'lodash/intersection.js';
import difference from 'lodash/difference.js';

export default function findDiff(obj1, obj2, offset = 4) {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  const unionKeys = sortBy(union(obj1Keys, obj2Keys));

  const intersectKeys = intersection(obj1Keys, obj2Keys);
  const firstDiff = difference(obj1Keys, obj2Keys);

  const hasInBoth = (key) => intersectKeys.includes(key);
  const hasOnlyInFirst = (key) => firstDiff.includes(key);

  const getPlainVal = (obj, key) => (
    isObject(obj[key])
      ? findDiff(obj[key], obj[key], offset + 4)
      : obj[key]
  );

  const getStr = (key, val, sign = ' ') => `${' '.repeat(offset - 2)}${sign} ${key}: ${val}\n`;

  const result = ['{\n'];

  result.push(
    ...unionKeys.map((key) => {
      if (hasInBoth(key)) {
        if (isObject(obj1[key]) && isObject(obj2[key])) {
          return getStr(key, findDiff(obj1[key], obj2[key], offset + 4));
        }

        if (obj1[key] !== obj2[key]) {
          const firstVal = getPlainVal(obj1, key);
          const secondVal = getPlainVal(obj2, key);

          return getStr(key, firstVal, '-') + getStr(key, secondVal, '+');
        }

        return getStr(key, obj1[key]);
      }

      if (hasOnlyInFirst(key)) {
        return getStr(key, getPlainVal(obj1, key), '-');
      }

      return getStr(key, getPlainVal(obj2, key), '+');
    }),
  );

  result.push(`${' '.repeat(offset - 4)}}`);

  return result.join('');
}
