import sortBy from 'lodash/sortBy.js';
import union from 'lodash/union.js';
import isObject from 'lodash/isObject.js';
import intersection from 'lodash/intersection.js';
import difference from 'lodash/difference.js';

export default function findDiff(helpers, file1, file2) {
  const compareObjects = (obj1, obj2, offset = 4) => {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);

    const unionKeys = sortBy(union(obj1Keys, obj2Keys));

    const intersectKeys = intersection(obj1Keys, obj2Keys);
    const firstDiff = difference(obj1Keys, obj2Keys);

    const hasInBoth = (key) => intersectKeys.includes(key);
    const hasOnlyInFirst = (key) => firstDiff.includes(key);

    const getPlainVal = (obj, key) => (
      isObject(obj[key])
        ? compareObjects(obj[key], obj[key], offset + 4)
        : obj[key]
    );

    const { getFirstLine } = helpers;
    const getLine = helpers.getLine.bind(null, offset);
    const getLastLine = helpers.getLastLine.bind(null, offset);

    const result = [getFirstLine()];

    result.push(
      ...unionKeys.map((key) => {
        if (hasInBoth(key)) {
          if (isObject(obj1[key]) && isObject(obj2[key])) {
            return getLine(key, compareObjects(obj1[key], obj2[key], offset + 4));
          }

          if (obj1[key] !== obj2[key]) {
            const firstVal = getPlainVal(obj1, key);
            const secondVal = getPlainVal(obj2, key);

            return getLine(key, firstVal, '-') + getLine(key, secondVal, '+');
          }

          return getLine(key, obj1[key]);
        }

        if (hasOnlyInFirst(key)) {
          return getLine(key, getPlainVal(obj1, key), '-');
        }

        return getLine(key, getPlainVal(obj2, key), '+');
      }),
    );

    result.push(getLastLine());

    return result.join('');
  };

  return compareObjects(file1, file2);
}
