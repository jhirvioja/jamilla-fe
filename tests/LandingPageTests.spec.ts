import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/')
})

test.describe('Landing Page tests', () => {
  test('Should have login button visible somewhere in the page', async ({ page }) => {
    await expect(page.locator('text=Kirjaudu sisään')).toBeVisible()
  })

  // todo: this needs to be refactored once login system is made
  test('Login button should have an operation which logins the user in', async ({ page }) => {
    await expect(page.locator('text=Kirjaudu sisään').first()).toHaveAttribute('href', '/browse')
  })

  test('Sign up sheet / form is visible', async ({ page }) => {
    await expect(page.locator('#signupsheet')).toBeVisible()
  })

  // Todo: sign up sheet, once working, needs to be checked via test that it works correctly
})
