import parseFile from './helpers/parseFile.js';

export default function gendiff(filepath1, filepath2) {
  console.log(parseFile(filepath1));
  console.log(parseFile(filepath2));
}
