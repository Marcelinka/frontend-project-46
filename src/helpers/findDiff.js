import parseKeys from './parseKeys.js';
import compareKeyFactory from './compareKey.js';

export default function findDiff(helpers, file1, file2) {
  const compareObjects = (obj1, obj2, offset = 4) => {
    const parsedKeys = parseKeys(obj1, obj2);

    const { getFirstLine } = helpers;
    const getLastLine = helpers.getLastLine.bind(null, offset);
    const compareKey = compareKeyFactory(obj1, obj2, parsedKeys, helpers, compareObjects, offset);

    const result = [getFirstLine()];
    result.push(...parsedKeys.unionKeys.map(compareKey));
    result.push(getLastLine());

    return result.join('');
  };

  return compareObjects(file1, file2);
}
