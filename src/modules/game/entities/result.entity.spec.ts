import { Result } from './result.entity';

describe('Result', () => {
  let resultInstance: Result;

  beforeEach(() => {
    resultInstance = new Result();
  });

  it('Should update progress', () => {
    expect(resultInstance.progress).toHaveLength(0);
    resultInstance.updateProgress(true);
    resultInstance.updateProgress(true);
    resultInstance.updateProgress(false);
    expect(resultInstance.progress).toHaveLength(3);
    expect(resultInstance.progress).toStrictEqual([true, true, false]);
  });

  it('Should end', () => {
    expect(resultInstance.isEnd).toBe(false);
    for (let i = 0; i < 10; i++) resultInstance.updateProgress(true);
    expect(resultInstance.isEnd).toBe(true);
  });
});
