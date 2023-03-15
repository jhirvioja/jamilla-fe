import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/browse/')
})

test.describe('Browse Page tests', () => {
  test('Can strikethrough and un-strikethrough an item with click', async ({ page }) => {
    await page.click('h1')
    await page.click('#ri_0')
    const locator = page.locator('#ri_0')
    await expect(locator).toHaveClass(/line-through/)
    await page.click('#ri_0')
    await expect(locator).not.toHaveClass(/line-through/)
  })

  test('Can strikethrough and un-strikethrough an item with keyboard press', async ({ page }) => {
    await page.click('h1')
    await page.press('#ri_0', 'Enter')
    const locator = page.locator('#ri_0')
    await expect(locator).toHaveClass(/line-through/)
    await page.click('#ri_0')
    await expect(locator).not.toHaveClass(/line-through/)
  })
})
