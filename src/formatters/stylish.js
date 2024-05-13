/**
 * @typedef {import('../helpers/getDiff.js').DiffElement} DiffElement
 */

/**
 * Возвращает строку с результатом сравнения одного элемента в формате stylish
 *
 * @param {DiffElement} element один элемент разницы между двумя объектами
 * @returns {string} результат сравнения
 */
const getElementString = (element) => {
  let str = '';

  if (['removed', 'updated'].includes(element.diffType)) {
    str += `  - ${element.key}: ${element.oldValue}\n`;
  }
  if (['added', 'updated'].includes(element.diffType)) {
    str += `  + ${element.key}: ${element.newValue}\n`;
  }
  if (element.diffType === 'unchanged') {
    str += `    ${element.key}: ${element.oldValue}\n`;
  }

  return str;
};

/**
 * Возвращает строку с результатом сравнения двух файлов в формате stylish
 *
 * @param {DiffElement[]} diff структура с разницей между двумя объектами
 * @returns {string} результат сравнения
 */
export default function stylish(diff) {
  let result = '{\n';

  diff.forEach((element) => {
    result += getElementString(element);
  });

  result += '}';

  return result;
}
