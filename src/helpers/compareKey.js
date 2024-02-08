import intersection from 'lodash/intersection.js';
import difference from 'lodash/difference.js';
import isObject from 'lodash/isObject.js';

const compareKeyFactory = (obj1, obj2, helpers, compareObjects, offset) => {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  const intersectKeys = intersection(obj1Keys, obj2Keys);
  const firstDiff = difference(obj1Keys, obj2Keys);

  const hasInBoth = (key) => intersectKeys.includes(key);
  const hasOnlyInFirst = (key) => firstDiff.includes(key);

  const getPlainVal = (obj, key) => (
    isObject(obj[key])
      ? compareObjects(obj[key], obj[key], offset + 4)
      : obj[key]
  );

  const getLine = helpers.getLine.bind(null, offset);

  return (key) => {
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
  };
};

export default compareKeyFactory;
