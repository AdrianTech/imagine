import { CheckFileSizePipe } from './check-file-size.pipe';

describe('CheckFileSizePipe', () => {
  it('should be defined', () => {
    expect(new CheckFileSizePipe(4)).toBeDefined();
  });
  test('not null, not undefined etc.', () => {
    expect(new CheckFileSizePipe(4)).not.toBeUndefined();
    expect(new CheckFileSizePipe(4)).not.toBeNull();
    expect(new CheckFileSizePipe(-1)).toThrowError();
  })
});
