import { describe, it } from 'node:test';
import { checkNodeVersion, checkMemory } from '../src/envCheck.js';

describe('Dependency Analysis', () => {
  it('should pass check node version test', () => {
    return checkNodeVersion();
  });
  it('should pass memory usage test', () => {
    return checkMemory();
  });
});
