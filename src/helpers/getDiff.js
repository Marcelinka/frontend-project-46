/**
 * @typedef {object} DiffElement
 * @property {string} key - ключ объекта
 * @property {'removed' | 'added' | 'updated' | 'unchanged'} diffType - тип изменения
 * @property {'value' | 'nested'} propertyType - тип свойства
 * @property {*} [oldValue] - старое значение только если propertyType = value и diffType != added
 * @property {*} [newValue] - новое значение только если propertyType = value и diffType != removed
 * @property {DiffElement[]} [children] - дети (только если propertyType = nested)
 */

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

  const keys = [...new Set([...keysFrom, ...keysTo])];

  const diff = keys.map((key) => {
    if (a[key] === b[key]) {
      return {
        key,
        diffType: 'unchanged',
        propertyType: 'value',
        oldValue: a[key],
        newValue: b[key],
      };
    }

    if (a[key] === undefined) {
      return {
        key,
        diffType: 'added',
        propertyType: 'value',
        newValue: b[key],
      };
    }

    if (b[key] === undefined) {
      return {
        key,
        diffType: 'removed',
        propertyType: 'value',
        oldValue: a[key],
      };
    }

    return {
      key,
      diffType: 'updated',
      propertyType: 'value',
      oldValue: a[key],
      newValue: b[key],
    };
  });

  return diff;
}
