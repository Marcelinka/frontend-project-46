import stylish from './stylish.js';
import plain from './plain.js';

/**
 * @typedef {import('../helpers/getDiff.js').DiffElement} DiffElement
 */

/**
 * Возвращает результат сравнения в зависимости от формата
 *
 * @param {DiffElement[]} diff результат сравнения двух файлов
 * @param {'stylish' | 'plain'} formatName формат вывода
 * @returns {string} результат сравнения
 */
export default function formatDiff(diff, formatName) {
  switch (formatName) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    default:
      throw new Error(`Unknown format: ${formatName}`);
  }
}
