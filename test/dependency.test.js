import { describe, it } from 'node:test';
import { analyzeDependencies } from '../src/depCheck.js';
import { checkOutdated } from '../src/outpkgCheck.js';
import { checkUnusedPackage } from '../src/unusedpkgCheck.js';

describe('Dependency Analysis', () => {
  it('should pass dependency analyze test', () => {
    const result = analyzeDependencies();
  });

  it('should pass outdate package analysize test', () => {
    const result = checkOutdated();
  });

  it('should pass unused package analysize test', () => {
    const result = checkUnusedPackage();
  });
});
