#!/usr/bin/env node

import { Command } from 'commander';
import {
  analyzeDependencies,
  checkOutdated,
  checkNodeVersion,
  checkMemory,
  checkUnusedPackage,
  getArchitecture,
  getOsName,
  validateDocker,
} from '../src/index.js';
import { logger } from '../src/logger.js';
import { runTask } from '../src/task.js';
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
  .version('1.3.2')
  .description('A CLI tool for analyzing Node.js applications')
  .option('-d, --dependencies', 'Analyze dependencies')
  .option('-o, --outdated', 'Check for outdated packages')
  .option('-n, --node-check', 'Check Node.js version compatibility')
  .option('-m, --memory-check', 'Check system memory')
  .option('-u, --unusedpkg', 'Detect unused dependencies')
  .option('-a, --arch', 'Detect system architecture')
  .option('-os, --name', 'Detect os name')
  .option('-dok, --dockerfile', 'Dockerfile validator');

program.parse(process.argv);

const options = program.opts();

(async () => {
  if (options.dependencies) {
    await runTask('Analyzing dependencies', analyzeDependencies);
  }

  if (options.outdated) {
    await runTask('Checking for outdated packages', checkOutdated);
  }

  if (options.nodeCheck) {
    await runTask('Checking Node.js version', checkNodeVersion);
  }

  if (options.memoryCheck) {
    await runTask('Checking system memory', checkMemory);
  }

  if (options.unusedpkg) {
    await runTask('Detecting unused dependencies', checkUnusedPackage);
  }

  if (options.arch) {
    await runTask('Detecting system architecture', getArchitecture);
  }

  if (options.name) {
    await runTask('Detecting operating system name', getOsName);
  }

  if (options.dockerfile) {
    await runTask('Validator dockerfile', validateDocker);
  }
})();
