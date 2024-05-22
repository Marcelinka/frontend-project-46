import _ from 'lodash';

/**
 * @typedef {object} DiffElement
 * @property {string} key - ключ объекта
 * @property {'removed' | 'added' | 'updated' | 'equal'} diffType - тип изменения
 * @property {'value' | 'nested'} propertyType - тип свойства
 * @property {*} [oldValue] - старое значение только если propertyType = value и diffType != added
 * @property {*} [newValue] - новое значение только если propertyType = value и diffType != removed
 * @property {DiffElement[]} [children] - дети (только если propertyType = nested)
 */

/**
 * @param {object} a
 * @param {object} b
 *
 * @returns {DiffElement}
 */
const checkObjectValues = (a, b) => {
  if (_.isEqual(a, b)) {
    return {
      diffType: 'equal',
      propertyType: 'value',
      oldValue: a,
      newValue: b,
    };
  }

  return {
    diffType: 'updated',
    propertyType: 'nested',
  };
};

/**
 * Только один из параметров может быть объектом
 *
 * @param {object | string | number | boolean} a
 * @param {object | string | number | boolean} b
 *
 * @returns {DiffElement}
 */
const checkPlainValues = (a, b) => {
  const baseElem = {
    propertyType: 'value',
    oldValue: a,
    newValue: b,
  };

  if (a === b) {
    return { diffType: 'equal', ...baseElem };
  }

  if (a === undefined) {
    return { diffType: 'added', ...baseElem };
  }

  if (b === undefined) {
    return { diffType: 'removed', ...baseElem };
  }

  return { diffType: 'updated', ...baseElem };
};

/**
 * Создание структуры с разницей от a к b между двумя объектами
 *
 * @param {object} a
 * @param {object} b
 *
 * @returns {DiffElement[]}
 */
export default function getDiff(a, b) {
  const keysFrom = Object.keys(a);
  const keysTo = Object.keys(b);

  const keys = [...new Set([...keysFrom, ...keysTo])].sort();

  const diff = keys.map((key) => {
    const res = { key };

    if (_.isObject(a[key]) && _.isObject(b[key])) {
      _.merge(res, checkObjectValues(a[key], b[key]));

      if (res.propertyType === 'nested') {
        res.children = getDiff(a[key], b[key]);
      }
    } else {
      _.merge(res, checkPlainValues(a[key], b[key]));
    }

    return res;
  });

  return diff;
}
