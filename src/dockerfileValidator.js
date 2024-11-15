import fs from 'node:fs';
import path from 'node:path';
import { logger } from './logger.js';

/**
 * Validate Dockerfile,
 */

export const validateDocker = async () => {
  try {
    const dockerfilePath = path.join(process.cwd(), 'Dockerfile');
    if (!fs.existsSync(dockerfilePath)) {
      throw new Error('Dockerfile not found in the current directory');
    }

    const dockerfile = fs.readFileSync(dockerfilePath, 'utf-8');
    const issue = [];

    if (!dockerfile.match(/^FROM\s+\S/m)) {
      issue.push('Dockerfile must start with a valid base image using the FROM instruction.');
    }

    // check for unpinned image version
    if (dockerfile.match(/^FROM\s+\S+:latest/im)) {
      issue.push('Avoid using the "latest" tag for the base image. Use a specific version instead.');
    }

    // Check for multi-stage builds
    const stages = dockerfile.match(/^FROM\s+\S+/gim) || [];
    if (stages.length > 1) {
      logger.info('Multi-stage builds detected. Good practice for optimized images.');
    }

    // // TODO: fix Check for combining RUN commands
    // if (dockerfile.match(/^RUN\s+.+&&.+\\\n/im)) {
    //   logger.info('RUN commands are combined using &&. This is good practice.');
    // } else if (dockerfile.match(/^RUN\s+/im)) {
    //   issue.push('Consider combining RUN commands using && to reduce image layers.');
    // }

    // Check for the presence of a .dockerignore file
    if (!fs.existsSync(path.join(process.cwd(), '.dockerignore'))) {
      issue.push('No .dockerignore file found. This may lead to large build contexts.');
    }

    // Check for insecure COPY commands
    if (dockerfile.match(/^COPY\s+\.\s+\/\s*$/im)) {
      issue.push('Avoid using "COPY . /". It can add unnecessary files to the image.');
    }

    if (issue.length > 0) {
      logger.warn('Dockerfile validation issues found:');
      issue.forEach((issu, index) => logger.warn(`${index + 1}. ${issu}`));
    } else {
      logger.info('No issues found. Dockerfile follows best practices!');
    }
  } catch (error) {
    logger.error('Error while validating Dockerfile:', error);
    throw error;
  }
};
