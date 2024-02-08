import intersection from 'lodash/intersection.js';
import difference from 'lodash/difference.js';
import sortBy from 'lodash/sortBy.js';
import union from 'lodash/union.js';

export default function parseKeys(obj1, obj2) {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  const unionKeys = sortBy(union(obj1Keys, obj2Keys));
  const intersectKeys = intersection(obj1Keys, obj2Keys);
  const firstDiff = difference(obj1Keys, obj2Keys);

  return { unionKeys, intersectKeys, firstDiff };
}
