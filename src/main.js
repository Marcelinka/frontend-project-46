import sortBy from 'lodash/sortBy.js';
import union from 'lodash/union.js';
import parseFile from './helpers/parseFile.js';
import getDiffByKey from './helpers/getDiffByKey.js';

export default function gendiff(filepath1, filepath2) {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);

  const file1Keys = sortBy(Object.keys(file1));
  const file2Keys = sortBy(Object.keys(file2));

  const unionKeys = union(file1Keys, file2Keys);

  const result = ['{\n'];

  result.push(
    ...unionKeys.map(getDiffByKey.bind(null, file1, file2)),
  );

  result.push('}');

  return result.join('');
}
