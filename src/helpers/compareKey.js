import isObject from 'lodash/isObject.js';

// eslint-disable-next-line max-len
const compareSimilarKeysFactory = (obj1, obj2, getLine, getPlainVal, compareObjects, offset) => (key) => {
  if (isObject(obj1[key]) && isObject(obj2[key])) {
    return getLine(key, compareObjects(obj1[key], obj2[key], offset + 4));
  }

  if (obj1[key] !== obj2[key]) {
    const firstVal = getPlainVal(obj1, key);
    const secondVal = getPlainVal(obj2, key);

    return getLine(key, firstVal, '-') + getLine(key, secondVal, '+');
  }

  return getLine(key, obj1[key]);
};

const compareKeyFactory = (obj1, obj2, parsedKeys, helpers, compareObjects, offset) => {
  const { intersectKeys, firstDiff } = parsedKeys;

  const hasInBoth = (key) => intersectKeys.includes(key);
  const hasOnlyInFirst = (key) => firstDiff.includes(key);

  const getPlainVal = (obj, key) => (
    isObject(obj[key])
      ? compareObjects(obj[key], obj[key], offset + 4)
      : obj[key]
  );

  const getLine = helpers.getLine.bind(null, offset);
  // eslint-disable-next-line max-len
  const compareSimilarKeys = compareSimilarKeysFactory(obj1, obj2, getLine, getPlainVal, compareObjects, offset);

  return (key) => {
    if (hasInBoth(key)) {
      return compareSimilarKeys(key);
    }

    if (hasOnlyInFirst(key)) {
      return getLine(key, getPlainVal(obj1, key), '-');
    }

    return getLine(key, getPlainVal(obj2, key), '+');
  };
};

export default compareKeyFactory;
