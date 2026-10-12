import type { User } from './user';

describe('User', () => {
  let user: User;

  beforeEach(() => {
    user = {} as User;
  });

  it('should be created', () => {
    expect(user).toBeTruthy();
  });
});
