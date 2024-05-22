import _ from 'lodash';

/**
 * @typedef {import('../helpers/getDiff.js').DiffElement} DiffElement
 */

const printObject = (obj, tabSize) => {
  let result = '{\n';

  _.forEach(obj, (value, key) => {
    result += `${_.repeat(' ', tabSize)}${key}: ${_.isObject(value) ? printObject(value, tabSize + 4) : value}\n`;
  });

  result += `${_.repeat(' ', tabSize - 4)}}`;

  return result;
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
  let str = '';

  if (['removed', 'updated'].includes(element.diffType)) {
    str += `${_.padStart('- ', tabSize)}${element.key}: ${getValue(element.oldValue, tabSize)}\n`;
  }
  if (['added', 'updated'].includes(element.diffType)) {
    str += `${_.padStart('+ ', tabSize)}${element.key}: ${getValue(element.newValue, tabSize)}\n`;
  }
  if (element.diffType === 'equal') {
    str += `${_.repeat(' ', tabSize)}${element.key}: ${getValue(element.oldValue, tabSize)}\n`;
  }

  return str;
};

/**
 * Возвращает строку с результатом сравнения двух файлов в формате stylish
 *
 * @param {DiffElement[]} diff структура с разницей между двумя объектами
 * @returns {string} результат сравнения
 */
export default function stylish(diff, tabSize = 4) {
  let result = '{\n';

  diff.forEach((element) => {
    if (element.propertyType === 'nested') {
      result += `${_.repeat(' ', tabSize)}${element.key}: ${stylish(element.children, tabSize + 4)}\n`;
    } else {
      result += getElementString(element, tabSize);
    }
  });

  result += `${_.repeat(' ', tabSize - 4)}}`;

  return result;
}
