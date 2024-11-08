import { describe, it } from 'node:test';
import { checkNodeVersion, checkMemory } from '../src/envCheck.js';

describe('Dependency Analysis', () => {
  it('should pass check node version test', () => {
    const result = checkNodeVersion();
  });
  it('should pass memory usage test', () => {
    const res = checkMemory();
  });
});
