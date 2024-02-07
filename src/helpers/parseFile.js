import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default function parseFile(filepath) {
  const file = fs.readFileSync(path.resolve(filepath), 'utf8');

  if (path.extname(filepath) === '.json') {
    return JSON.parse(file);
  }

  if (path.extname(filepath) === '.yaml' || path.extname(filepath) === '.yml') {
    return yaml.load(file);
  }

  throw new Error('Unknown file extension');
}
