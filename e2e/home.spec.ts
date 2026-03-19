import { expect, test } from '@playwright/test';

test('home page loads and shows hero', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: /quizzy|smarter quizzes/i }),
  ).toBeVisible();
});

test('navigate to quizzes', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /quizzes/i }).click();
  await expect(page).toHaveURL(/\/quizzes/);
});
