import { describe, it } from 'node:test';
import { getArchitecture, getOsName } from '../src/osCheck.js';

describe('perform operating system', () => {
  it('should get os architecture', () => {
    return getArchitecture();
  });

  it('should get os name', () => {
    return getOsName();
  });
});
