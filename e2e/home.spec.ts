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

test('home page shows AI-Powered Quiz Generation badge', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText(/AI-Powered Quiz Generation/i)).toBeVisible();
});

test('home page shows Features section', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: /everything you need/i }),
  ).toBeVisible();
});

test('home page shows feature cards', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('AI-Powered Generation')).toBeVisible();
});

test('navbar logo and brand are visible', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('link', { name: /quizzy/i }).first(),
  ).toBeVisible();
});

test('navigate to Dashboard from home', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /dashboard/i }).click();
  await expect(page).toHaveURL(/\/quiz-dashboard|sign-in/);
});

test('navigate to Leaderboard from home', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /leaderboard/i }).click();
  await expect(page).toHaveURL(/\/quiz-leaderboard|sign-in/);
});
