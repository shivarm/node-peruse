import fs from 'node:fs';
import path from 'node:path';
import { glob } from 'glob';
import { logger } from './logger.js';

const getDependenciesFromPackageJson = () => {
  const packagePath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
  return Object.keys(packageJson.dependencies || {});
};

const findDependencyUsage = (dependency, files) => {
  const regex = new RegExp(
    `require\\(['"\`]${dependency}['"\`]\\)|import\\s+.*?\\s+from\\s+['"\`]${dependency}['"\`]`,
    'g',
  );
  return files.some((file) => regex.test(fs.readFileSync(file, 'utf-8')));
};

export const checkUnusedPackage = () => {
  logger.info('Checking for unused dependencies...');

  const dependencies = getDependenciesFromPackageJson();
  const files = glob.sync('**/*.{js,ts}', { ignore: 'node_modules/**' });
  const unusedpkg = [];

  for (const pkg of dependencies) {
    if (!findDependencyUsage(pkg, files)) {
      unusedpkg.push(pkg);
    }
  }

  if (unusedpkg.length) {
    logger.warn(`Unused dependencies found: ${unusedpkg.join(', ')}`);
  } else {
    logger.info('No unused dependencies found.');
  }

  return unusedpkg;
};
