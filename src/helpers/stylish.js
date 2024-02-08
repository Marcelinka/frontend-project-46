export const getFirstLine = () => '{\n';

export const getLine = (offset, key, val, sign = ' ') => `${' '.repeat(offset - 2)}${sign} ${key}: ${val}\n`;

export const getLastLine = (offset) => `${' '.repeat(offset - 4)}}`;
