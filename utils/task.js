import ora from 'ora';
import { logger } from '../src/logger.js';

export const runTask = async (taskName, taskFunc) => {
  const spinner = ora(`${taskName}...`).start();
  try {
    await taskFunc();
    spinner.succeed(`${taskName}`);
  } catch (error) {
    spinner.fail(`${taskName}`);
    logger.error(error.message);
  }
};
