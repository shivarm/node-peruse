import { execSync } from 'child_process';
import { logger } from './logger.js';

export const validateGitCommits = async () => {
  try {
    const log = execSync('git log -n 10 --pretty=format:"%h %s"', { encoding: 'utf-8' });
    const commits = log.split('\n');

    const issues = [];
    const semanticPrefixes = ['feat', 'fix', 'chore', 'docs', 'style', 'refactor', 'test'];

    commits.forEach((commit, index) => {
      const [hash, ...messageParts] = commit.split(' ');
      const message = messageParts.join(' ');

      // Check for semantic prefixes
      if (!semanticPrefixes.some((prefix) => message.startsWith(`${prefix}:`))) {
        issues.push(`Commit ${hash} is missing a semantic prefix.`);
      }

      // Check message length
      if (message.length < 10) {
        issues.push(`Commit ${hash} has a too-short message.`);
      }
    });

    if (issues.length > 0) {
      logger.warn('Git commit validation issues found:');
      issues.forEach((issue, i) => logger.warn(`${i + 1}. ${issue}`));
    } else {
      logger.info('All recent commits follow best practices!');
    }
  } catch (error) {
    logger.error(`Error during commit validation: ${error.message}`);
    throw Error(error);
  }
};
