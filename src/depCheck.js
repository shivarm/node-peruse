import fs from 'node:fs';
import { logger } from './logger.js';

export const analyzeDependencies = async () => {
  try {
    const packageJsonPath = './package.json';
    if (!fs.existsSync(packageJsonPath)) {
      throw new Error('package.json not found in the current directory.');
    }

    /*
     * Read the package.json file and parse it as JSON object
     *  get the dependencies object from the package.json file
     */
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const dependencies = packageJson.dependencies || {};
    logger.info('Analyzing dependencies...');

    Object.keys(dependencies).forEach((dep) => {
      logger.info(`Analyzed dependency: ${dep} - ${dependencies[dep]}`);
    });

    logger.info('Dependency analysis completed.');
  } catch (error) {
    logger.error(`Dependency analysis failed: ${error.message}`);
    throw error;
  }
};
