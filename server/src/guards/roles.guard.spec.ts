import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  it('should be defined', () => {
    expect(new RolesGuard(['Admin'])).toBeDefined();
  });
});
