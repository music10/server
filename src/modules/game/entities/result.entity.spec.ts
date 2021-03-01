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
});
