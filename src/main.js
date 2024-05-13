import parseFile from './helpers/parseFile.js';
import getDiff from './helpers/getDiff.js';
import formatDiff from './formatters/index.js';

/**
 * Возвращает строку с результатом сравнения двух файлов в зависимости от формата
 *
 * @param {string} filepath1 путь к первому файлу
 * @param {string} filepath2 путь к второму файлу
 * @param {'stylish' | 'plain'} [format='stylish'] формат вывода
 * @returns {string} результат сравнения
 */
export default function gendiff(filepath1, filepath2, format = 'stylish') {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);

  const diff = getDiff(file1, file2);
  console.log(formatDiff(diff, format));
}
