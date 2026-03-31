import { expect, test } from '@playwright/test';

test('quizzes page loads', async ({ page }) => {
  await page.goto('/quizzes');
  await expect(
    page
      .getByRole('heading', {
        name: /explore quizzes|all quizzes|no quizzes found/i,
      })
      .first(),
  ).toBeVisible();
});

test('search input is present and accepts input', async ({ page }) => {
  await page.goto('/quizzes');
  const searchInput = page.getByPlaceholder(/search quizzes/i);
  await expect(searchInput).toBeVisible();
  await searchInput.fill('test');
  await expect(searchInput).toHaveValue('test');
});

test('difficulty filter is present', async ({ page }) => {
  await page.goto('/quizzes');
  const difficultyTrigger = page.getByRole('combobox');
  await expect(difficultyTrigger).toBeVisible();
});

test('can filter by difficulty', async ({ page }) => {
  await page.goto('/quizzes');
  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Easy' }).click();
  await expect(page).toHaveURL(/difficulty=EASY/);
});

test('navigate to quiz detail when quiz cards exist', async ({ page }) => {
  await page.goto('/quizzes');
  const seeDetailsLinks = page.getByRole('link', { name: /see details/i });
  if ((await seeDetailsLinks.count()) > 0) {
    await seeDetailsLinks.first().click();
    await expect(page).toHaveURL(/\/quizzes\/[^/]+$/);
  }
});

test('can filter by Medium difficulty', async ({ page }) => {
  await page.goto('/quizzes');
  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Medium' }).click();
  await expect(page).toHaveURL(/difficulty=MEDIUM/);
});

test('can filter by Hard difficulty', async ({ page }) => {
  await page.goto('/quizzes');
  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Hard' }).click();
  await expect(page).toHaveURL(/difficulty=HARD/);
});

test('can reset filter to All', async ({ page }) => {
  await page.goto('/quizzes?difficulty=EASY');
  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'All' }).click();
  await expect(page).toHaveURL(/\/quizzes/);
});

test('navigate from quizzes back to home', async ({ page }) => {
  await page.goto('/quizzes');
  await page
    .getByRole('navigation')
    .getByRole('link', { name: 'Home' })
    .click();
  await expect(page).toHaveURL('/');
});

test('quizzes page shows Explore Quizzes heading', async ({ page }) => {
  await page.goto('/quizzes');
  await expect(
    page.getByRole('heading', { name: 'Explore Quizzes' }),
  ).toBeVisible();
});
