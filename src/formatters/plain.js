/**
 * @typedef {import('../helpers/getDiff.js').DiffElement} DiffElement
 */

/**
 * Возвращает строку с результатом сравнения двух файлов в формате plain
 *
 * @param {DiffElement[]} diff результат сравнения двух файлов
 * @returns {string} результат сравнения
 */
export default function plain(diff) {
  let result = '';

  diff.forEach((element) => {
    if (element.diffType === 'added') {
      result += `Property '${element.key}' was added with value: ${element.newValue}\n`;
    }
    if (element.diffType === 'removed') {
      result += `Property '${element.key}' was removed\n`;
    }
    if (element.diffType === 'updated') {
      result += `Property '${element.key}' was updated. From ${element.oldValue} to ${element.newValue}\n`;
    }
  });

  return result;
}
