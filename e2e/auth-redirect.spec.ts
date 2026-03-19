import { expect, test } from '@playwright/test';

test.describe('protected routes redirect unauthenticated users', () => {
  test('quiz-leaderboard redirects to sign-in when not logged in', async ({
    page,
  }) => {
    await page.goto('/quiz-leaderboard');
    await expect(page).toHaveURL(/sign-in|accounts\.dev/);
  });

  test('quiz-dashboard redirects to sign-in when not logged in', async ({
    page,
  }) => {
    await page.goto('/quiz-dashboard');
    await expect(page).toHaveURL(/sign-in|accounts\.dev/);
  });

  test('quiz-builder redirects to sign-in when not logged in', async ({
    page,
  }) => {
    await page.goto('/quiz-builder');
    await expect(page).toHaveURL(/sign-in|accounts\.dev/);
  });
});
