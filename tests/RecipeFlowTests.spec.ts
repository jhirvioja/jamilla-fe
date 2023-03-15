import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/browse')
})

test.describe('Recipe Flow tests', () => {
  test('Start recipe button exists', async ({ page }) => {
    await page.click('h1')
    expect(page.locator('text=Aloita resepti')).toBeVisible
  })

  test('Progressbar renders', async ({ page }) => {
    await page.click('h1')
    await page.locator('text=Aloita resepti').click()
    await expect(page.locator('#recipe__progressbar')).toBeVisible
  })

  test('Right part at the right part of the recipe', async ({ page }) => {
    await page.click('h1')
    await page.locator('text=Aloita resepti').click()
    const locator = page.locator('#recipe__progress--part')
    await expect(locator).toHaveText(/1/)
  })

  test('Clicking next takes you to the next part', async ({ page }) => {
    await page.click('h1')
    await page.locator('text=Aloita resepti').click()
    await page.locator('text=Seuraava').click()
    await expect(page.locator('#recipe__progress--part')).toHaveText(/2/)
  })

  test('Clicking next and then back takes you back to the start', async ({ page }) => {
    await page.click('h1')
    await page.locator('text=Aloita resepti').click()
    await page.locator('text=Seuraava').click()
    await expect(page.locator('#recipe__progress--part')).toHaveText(/2/)
    await page.locator('text=Edellinen').click()
    await expect(page.locator('#recipe__progress--part')).toHaveText(/1/)
  })

  test('At the end, button should be of the "return to start" variety', async ({ page }) => {
    // Done with the mock pizza recipe. Otherwise, add clicks to fit the amount of steps for the tests to pass!
    await page.click('h1')
    await page.locator('text=Aloita resepti').click()
    await page.locator('text=Seuraava').click()
    await page.locator('text=Seuraava').click()
    await page.locator('text=Seuraava').click()
    expect(page.locator('#recipe__button--final')).toBeVisible
  })
})
