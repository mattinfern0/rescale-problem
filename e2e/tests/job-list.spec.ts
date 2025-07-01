import {expect, test} from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';

test.describe.configure({ mode: 'serial' })

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe("Job List Page", () => {
  const jobName = `Playwright Job-${uuidv4()}`;

  test('should allow creating a new job', async ({page}) => {
    await page.getByRole('textbox', {name: 'Name'}).click();
    await page.getByRole('textbox', {name: 'Name'}).fill(jobName);
    await page.getByRole('button', {name: 'Create Job'}).click();

    await expect(page.locator('tbody').locator('tr').nth(0)).toContainText('Pending');
  });

  test('should allow updating status', async ({ page }) => {
    await page.getByRole('row', { name: jobName }).getByRole('combobox').click();
    await page.getByRole('option', { name: 'Completed' }).click();
    await expect(page.getByRole('row', { name: jobName })).toContainText('Completed');
  });

  test('should allow deleting a job', async ({ page }) => {
    await page.getByRole('row', { name: jobName }).getByRole('button', { name: /delete/i }).click();
    await expect(page.getByRole('row', { name: jobName })).toHaveCount(0);
  });
})
