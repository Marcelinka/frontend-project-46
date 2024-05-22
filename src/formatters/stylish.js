import _ from 'lodash';

/**
 * @typedef {import('../helpers/getDiff.js').DiffElement} DiffElement
 */

const printObject = (obj, tabSize) => {
  const rows = ['{'];

  _.forEach(obj, (value, key) => {
    rows.push(`${_.repeat(' ', tabSize)}${key}: ${_.isObject(value) ? printObject(value, tabSize + 4) : value}`);
  });

  rows.push(`${_.repeat(' ', tabSize - 4)}}`);

  return rows.join('\n');
};

const getValue = (value, tabSize) => {
  if (_.isObject(value)) {
    return printObject(value, tabSize + 4);
  }

  return value;
};

/**
 * Возвращает строку с результатом сравнения одного элемента в формате stylish
 *
 * @param {DiffElement} element один элемент разницы между двумя объектами
 * @returns {string} результат сравнения
 */
const getElementString = (element, tabSize) => {
  const rows = [];

  if (['removed', 'updated'].includes(element.diffType)) {
    rows.push(`${_.padStart('- ', tabSize)}${element.key}: ${getValue(element.oldValue, tabSize)}`);
  }
  if (['added', 'updated'].includes(element.diffType)) {
    rows.push(`${_.padStart('+ ', tabSize)}${element.key}: ${getValue(element.newValue, tabSize)}`);
  }
  if (element.diffType === 'equal') {
    rows.push(`${_.repeat(' ', tabSize)}${element.key}: ${getValue(element.oldValue, tabSize)}`);
  }

  return rows.join('\n');
};

/**
 * Возвращает строку с результатом сравнения двух файлов в формате stylish
 *
 * @param {DiffElement[]} diff структура с разницей между двумя объектами
 * @returns {string} результат сравнения
 */
export default function stylish(diff, tabSize = 4) {
  const rows = ['{'];

  diff.forEach((element) => {
    if (element.propertyType === 'nested') {
      return rows.push(`${_.repeat(' ', tabSize)}${element.key}: ${stylish(element.children, tabSize + 4)}`);
    }

    return rows.push(getElementString(element, tabSize));
  });

  rows.push(`${_.repeat(' ', tabSize - 4)}}`);

  return rows.join('\n');
}
