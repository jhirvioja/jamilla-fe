import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/search')
})

test.describe('Search Tests', () => {
  test('Search Button Exists', ({ page }) => {
    expect(page.locator('button', { hasText: 'Hae' })).toBeVisible
  })

  test('Renders some search results', async ({ page }) => {
    await page.locator('text=Hakusana').first().fill('tof')
    await page.locator('button', { hasText: 'Hae' }).click()
    expect(page.locator('text=Tofu-kookoskorma')).toBeVisible
  })
})
