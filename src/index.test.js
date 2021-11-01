const cli = require('./index');

describe('CLI', () => {
  it('Should be truthy', () => {
    expect(true).toBeTruthy();
  });

  it('Should be a function', () => {
    expect(typeof cli).toBe('function');
    expect(() => cli()).not.toThrow();
  });
});
