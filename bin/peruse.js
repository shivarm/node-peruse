#!/usr/bin/env node

import { Command } from 'commander';
import ora from 'ora';
import { analyzeDependencies, checkOutdated, checkNodeVersion, checkMemory, checkUnusedPackage } from '../src/index.js';
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
  .option('-o, --outdated', 'Check for outdated packages')
  .option('-n, --node-check', 'Check Node.js version compatibility')
  .option('-m, --memory-check', 'Check system memory')
  .option('-u, --unusedpkg', 'Detect unused dependencies');

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

if (options.nodeCheck) {
  const spinner = ora('Checking Node.js version...').start();
  try {
    checkNodeVersion();
    spinner.succeed('Node.js version check completed.');
  } catch (error) {
    spinner.fail('Node.js version check failed.');
    logger.error(error.message);
  }
}

if (options.memoryCheck) {
  const spinner = ora('Checking system memory...').start();
  try {
    checkMemory();
    spinner.succeed('System memory check completed.');
  } catch (error) {
    spinner.fail('System memory check failed.');
    logger.error(error.message);
  }
}

if (options.unusedpkg) {
  const spinner = ora('Detecting unused dependencies...').start();
  (async () => {
    try {
      const unusedpkg = await checkUnusedPackage();
      if (unusedpkg.length === 0) {
        spinner.succeed('No unused dependencies found.');
      } else {
        spinner.succeed('Unused dependencies detection completed.');
      }
    } catch (error) {
      spinner.fail('Failed to detect unused dependencies.');
      logger.error(error.message);
    }
  })();
}
