/**
 * @typedef {import('../helpers/getDiff.js').DiffElement} DiffElement
 */

/**
 * Возвращает строку с результатом сравнения двух файлов в формате plain
 *
 * @param {DiffElement[]} diff результат сравнения двух файлов
 * @returns {string} результат сравнения
 */
export default function json(diff) {
  return JSON.stringify(diff, null, 4);
}
