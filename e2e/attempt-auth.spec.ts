import { expect, test } from '@playwright/test';

test.describe('attempt routes redirect unauthenticated users', () => {
  test('quiz attempt route redirects to sign-in when not logged in', async ({
    page,
  }) => {
    await page.goto('/quizzes/test-quiz/attempt');
    await expect(page).toHaveURL(/sign-in|accounts\.dev/);
  });

  test('attempt result route redirects to sign-in when not logged in', async ({
    page,
  }) => {
    await page.goto('/attempts/test-attempt/score');
    await expect(page).toHaveURL(/sign-in|accounts\.dev/);
  });
});
