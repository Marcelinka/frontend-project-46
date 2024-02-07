#!/usr/bin/env node

import { Command } from 'commander';
import gendiff from '../src/main.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action(gendiff);

program.parse();
