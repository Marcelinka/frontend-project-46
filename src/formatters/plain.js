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
  const rows = diff.map((element) => {
    if (element.diffType === 'added') {
      return `Property '${prefix}${element.key}' was added with value: ${getValue(element.newValue)}`;
    }

    if (element.diffType === 'removed') {
      return `Property '${prefix}${element.key}' was removed`;
    }

    if (element.diffType === 'updated') {
      if (element.propertyType === 'value') {
        return `Property '${prefix}${element.key}' was updated. From ${getValue(element.oldValue)} to ${getValue(element.newValue)}`;
      }

      return plain(element.children, `${prefix}${element.key}.`);
    }

    return null;
  });

  return rows
    .filter((el) => Boolean(el))
    .join('\n');
}
