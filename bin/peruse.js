#!/usr/bin/env node

import { Command } from 'commander';
import ora from 'ora';
import { analyzeDependencies, checkOutdated } from '../src/index.js';
import { logger } from '../src/logger.js';
import figlet from 'figlet';

const program = new Command();

figlet('node persue', (err, data) => {
  if (err) {
    logger.error('Something went wrong...');
    return;
  }
  console.log(data);
});

program

  .version('0.1.0')
  .description('A CLI tool for analyzing Node.js applications')
  .option('-d, --dependencies', 'Analyze dependencies')
  .option('-o, --outdated', 'Check for outdated packages');

program.parse(process.argv);

const options = program.opts();

if (options.dependencies) {
  const spinner = ora('Analyzing dependencies').start();
  analyzeDependencies()
    .then(() => {
      spinner.succeed('Dependency analysis completed.');
    })
    .catch((error) => {
      spinner.fail('Dependency analysis failed.');
      logger.error(error.message);
    });
}

if (options.outdated) {
  const spinner = ora('Checking for outdated packages').start();
  checkOutdated()
    .then(() => {
      spinner.succeed('Outdated packages check completed.');
    })
    .catch((error) => {
      spinner.fail('Failed to check outdated packages.');
      logger.error(error.message);
    });
}
