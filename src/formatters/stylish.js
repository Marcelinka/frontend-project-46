import _ from 'lodash';

/**
 * @typedef {import('../helpers/getDiff.js').DiffElement} DiffElement
 */

const printObject = (obj, tabSize) => {
  const middleRows = _.toPairs(obj)
    .map(([key, value]) => `${_.repeat(' ', tabSize)}${key}: ${_.isObject(value) ? printObject(value, tabSize + 4) : value}`);

  const rows = ['{'].concat(middleRows, [`${_.repeat(' ', tabSize - 4)}}`]);

  return rows.join('\n');
};

const getValue = (value, tabSize) => {
  if (_.isObject(value)) {
    return printObject(value, tabSize + 4);
  }

  return value;
};

const getRemovedString = (element, tabSize) => `${_.padStart('- ', tabSize)}${element.key}: ${getValue(element.oldValue, tabSize)}`;

const getAddedString = (element, tabSize) => `${_.padStart('+ ', tabSize)}${element.key}: ${getValue(element.newValue, tabSize)}`;

const getEqualString = (element, tabSize) => `${_.repeat(' ', tabSize)}${element.key}: ${getValue(element.oldValue, tabSize)}`;

/**
 * Возвращает строку с результатом сравнения одного элемента в формате stylish
 *
 * @param {DiffElement} element один элемент разницы между двумя объектами
 * @returns {string} результат сравнения
 */
const getElementString = (element, tabSize) => {
  if (element.diffType === 'removed') {
    return getRemovedString(element, tabSize);
  }

  if (element.diffType === 'added') {
    return getAddedString(element, tabSize);
  }

  if (element.diffType === 'updated') {
    return `${getRemovedString(element, tabSize)}\n${getAddedString(element, tabSize)}`;
  }

  return getEqualString(element, tabSize);
};

/**
 * Возвращает строку с результатом сравнения двух файлов в формате stylish
 *
 * @param {DiffElement[]} diff структура с разницей между двумя объектами
 * @returns {string} результат сравнения
 */
export default function stylish(diff, tabSize = 4) {
  const middleRows = diff.map((element) => {
    if (element.propertyType === 'nested') {
      return `${_.repeat(' ', tabSize)}${element.key}: ${stylish(element.children, tabSize + 4)}`;
    }

    return getElementString(element, tabSize);
  });

  const rows = ['{'].concat(middleRows, [`${_.repeat(' ', tabSize - 4)}}`]);

  return rows.join('\n');
}
