import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/browse')
})

test.describe('Browse Page tests', () => {
  test('Nav renders and opens with mouse click', async ({ page }) => {
    await page.click('#nav__button')
    await expect(page.locator('#nav__button')).toHaveAttribute('aria-expanded', 'true')
  })

  test('Main renders', async ({ page }) => {
    await expect(page.locator('.main')).toBeVisible()
  })

  test('Footer renders and has copyright text', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible()
    await expect(page.locator('footer')).toContainText('©')
  })
})
