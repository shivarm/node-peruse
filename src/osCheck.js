import os from 'node:os';
import { logger } from './logger.js';

/*
 * Get system architecture
 */

export const getArchitecture = () => {
  const result = os.arch();
  logger.info(`Found ${result} architecture`);
};

/*
 * Get operating system name
 */
export const getOsName = () => {
  const result = os.type();
  logger.info(`Found ${result}`);
};
