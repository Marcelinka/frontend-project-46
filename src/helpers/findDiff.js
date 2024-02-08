import sortBy from 'lodash/sortBy.js';
import union from 'lodash/union.js';
import compareKeyFactory from './compareKey.js';

export default function findDiff(helpers, file1, file2) {
  const compareObjects = (obj1, obj2, offset = 4) => {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);

    const unionKeys = sortBy(union(obj1Keys, obj2Keys));

    const { getFirstLine } = helpers;
    const getLastLine = helpers.getLastLine.bind(null, offset);
    const compareKey = compareKeyFactory(obj1, obj2, helpers, compareObjects, offset);

    const result = [getFirstLine()];
    result.push(...unionKeys.map(compareKey));
    result.push(getLastLine());

    return result.join('');
  };

  return compareObjects(file1, file2);
}
