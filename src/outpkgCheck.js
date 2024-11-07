import { exec } from 'child_process';
import { logger } from './logger.js';

export const checkOutdated = () => {
  return new Promise((resolve, reject) => {
    exec('npm outdated --json', (error, stdout, stderr) => {
      if (error && error.code !== 1) {
        // npm outdated returns code 1 if there are outdated packages
        logger.error(`Error executing npm outdated: ${stderr}`);
        return reject(new Error('Failed to execute npm outdated.'));
      }

      let outdated;
      try {
        outdated = JSON.parse(stdout);
      } catch (parseError) {
        return reject(new Error('Failed to parse npm outdated output.'));
      }

      if (Object.keys(outdated).length === 0) {
        logger.info('All packages are up-to-date.');
      } else {
        for (const [pkg, details] of Object.entries(outdated)) {
          logger.warn(`Outdated package: ${pkg} - Current: ${details.current}, Latest: ${details.latest}`);
        }
      }

      logger.info('Completed outdated packages check.');
      resolve();
    });
  });
};
