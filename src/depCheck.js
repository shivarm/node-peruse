import fs from 'node:fs';
import { logger } from './logger.js';
import { execSync } from 'child_process';

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

export const simulateDependencyImpact = async () => {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
    const dependencies = packageJson.dependencies || {};
    const simulationResults = [];

    for (const [dep, currentVersion] of Object.entries(dependencies)) {
      logger.info(`Analyzing ${dep}...`);

      const latestInfo = await fetch(`https://registry.npmjs.org/${dep}`).then((res) => res.json());
      const latestVersion = latestInfo['dist-tags'].latest;

      if (currentVersion !== latestVersion) {
        logger.info(`${dep}: Current version ${currentVersion}, Latest version ${latestVersion}`);

        const tempDir = `simulation-${dep}`;
        execSync(`mkdir ${tempDir} && cp -r . ${tempDir}`);
        execSync(`cd ${tempDir} && npm install ${dep}@${latestVersion}`);

        try {
          execSync(`cd ${tempDir} && npm run build`);
          execSync(`cd ${tempDir} && npm test`);
          const sizeDiff = analyzeBundleSize(tempDir);

          simulationResults.push({
            dependency: dep,
            currentVersion,
            latestVersion,
            sizeDiff,
            status: 'Success',
          });
        } catch (error) {
          simulationResults.push({
            dependency: dep,
            currentVersion,
            latestVersion,
            status: 'Failed',
            error: error.message,
          });
        } finally {
          execSync(`rm -rf ${tempDir}`);
        }
      } else {
        logger.info(`${dep} is already up-to-date.`);
      }
    }

    generateReport(simulationResults);
  } catch (error) {
    logger.error(`Error simulating dependency impact: ${error.message}`);
  }
};

const analyzeBundleSize = (dir) => {
  // Simulate bundle size analysis (replace with actual implementation)
  return Math.random() * 10; // Placeholder for size difference in KB
};

const generateReport = (results) => {
  const report = results
    .map(
      (result) => `
Dependency: ${result.dependency}
Current Version: ${result.currentVersion}
Latest Version: ${result.latestVersion}
Size Impact: ${result.sizeDiff} KB
Status: ${result.status}
${result.error ? `Error: ${result.error}` : ''}
  `,
    )
    .join('\n');

  fs.writeFileSync('dependency-impact-report.txt', report);
  logger.info('Simulation report generated: dependency-impact-report.txt');
};
