import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/add')
})

test.describe('Recipe Add Tests', () => {
  test('Different operational buttons exist', async ({ page }) => {
    expect(page.locator('text=Lisää ainesosa')).toBeVisible
    expect(page.locator('text=Lisää kohta')).toBeVisible
    expect(page.locator('text=Tallenna ja julkaise')).toBeVisible
    expect(page.locator('text=Tyhjennä')).toBeVisible
  })

  test('Form renders every part as expected and takes inputs', async ({ page }) => {
    await page.locator('text=Nimi').fill('Papupata')
    await page.locator('text=Kuvan URL-osoite').fill('http://www.example.com')
    await page.locator('text=Hashtagit, erota pilkulla ilman välilyöntiä').fill('esimerkki,tagit,tahan')
    await page.locator('text=Reseptin kuvaus').fill('Appilan pappilan apupapin papupata pankolla kiehuu ja kuohuu.')
    await page.locator('label', { hasText: 'Määrä' }).fill('1')
    await page.locator('label', { hasText: 'Yksikkö' }).fill('kpl')
    await page.locator('label', { hasText: 'Ainesosa' }).fill('Papuja')
    await page.locator('label', { hasText: 'Ohjeteksti' }).fill('Laitappa papupata palamaan.')
  })

  test('After adding an ingredient, user can delete said ingredient', async ({ page }) => {
    await page.locator('text=Lisää ainesosa').click()
    await expect(page.locator('text=Poista ainesosa')).toBeVisible
    await page.locator('text=Poista ainesosa').click()
    await expect(page.locator('text=Poista ainesosa')).not.toBeVisible
  })

  test('After adding a part, user can delete the part', async ({ page }) => {
    await page.locator('text=Lisää kohta').click()
    await expect(page.locator('text=Poista kohta')).toBeVisible
    await page.locator('text=Poista kohta').click()
    await expect(page.locator('text=Poista kohta')).not.toBeVisible
  })

  test('Clicking submit on an empty form does not submit and emits error', async ({ page }) => {
    await page.locator('text=Tallenna').click()
    await expect(page.locator('text=Tarkistathan lomakkeen')).toBeVisible
  })
})
