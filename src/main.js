import parseFile from './helpers/parseFile.js';
import findDiff from './helpers/findDiff.js';
import * as stylishHelpers from './helpers/stylish.js';

export default function gendiff(filepath1, filepath2) {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);

  return findDiff(stylishHelpers, file1, file2);
}
