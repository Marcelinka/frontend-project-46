import _ from 'lodash';

/**
 * @typedef {import('../helpers/getDiff.js').DiffElement} DiffElement
 */

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

/**
 * Возвращает строку с результатом сравнения двух файлов в формате plain
 *
 * @param {DiffElement[]} diff результат сравнения двух файлов
 * @returns {string} результат сравнения
 */
export default function plain(diff, prefix = '') {
  let result = '';

  diff.forEach((element) => {
    if (element.diffType === 'added') {
      result += `Property '${prefix}${element.key}' was added with value: ${getValue(element.newValue)}\n`;
    } else if (element.diffType === 'removed') {
      result += `Property '${prefix}${element.key}' was removed\n`;
    } else if (element.diffType === 'updated') {
      if (element.propertyType === 'value') {
        result += `Property '${prefix}${element.key}' was updated. From ${getValue(element.oldValue)} to ${getValue(element.newValue)}\n`;
      } else {
        result += plain(element.children, `${prefix}${element.key}.`);
      }
    }
  });

  return prefix === '' ? _.trimEnd(result) : result;
}
