import os from 'node:os';
import semver from 'semver';
import { logger } from './logger.js';

export const checkNodeVersion = () => {
  const requiredNodeVersion = '>=14.0.0';
  const currentNodeVersion = process.version;

  if (semver.satisfies(currentNodeVersion, requiredNodeVersion)) {
    logger.info(`Node.js version is supported: ${currentNodeVersion}`);
  } else {
    logger.error(`Node.js version is outdated. Please upgrade to v14 or later`);
  }
};

export const checkMemory = () => {
  const memoryThreshold = 2 * 1024 * 1024 * 1024; // 2 GB
  const totalMemory = os.totalmem();
  const getOs = os.type();
  logger.info(`Operating system ${getOs} detected`);
  if (totalMemory < memoryThreshold) {
    logger.error(`Insufficient system memory. At least 2 GB of RAM is recommended.`);
  } else {
    logger.info(`Sufficient system memory detected`);
  }
};
