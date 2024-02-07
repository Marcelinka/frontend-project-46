import has from 'lodash/has.js';

export default function getDiffByKey(file1, file2, key) {
  let str = '';

  if (file1[key] !== file2[key]) {
    if (has(file1, key)) {
      str += `  - ${key}: ${file1[key]}\n`;
    }

    if (has(file2, key)) {
      str += `  + ${key}: ${file2[key]}\n`;
    }

    return str;
  }

  return `    ${key}: ${file1[key]}\n`;
}
