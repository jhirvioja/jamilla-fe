import { test, chromium, Browser, Page } from '@playwright/test'
import { injectAxe, checkA11y } from 'axe-playwright'

// For this one I use a simple middleware
// But there are also ways to do it more extensively and precisely:
// https://playwright.dev/docs/accessibility-testing

let browser: Browser
let page: Page

test.describe('Landing', () => {
	test.beforeAll(async () => {
		browser = await chromium.launch()
		page = await browser.newPage()
		await page.goto(`http://localhost:3000`)
		await injectAxe(page)
	})

	test('A11y run', async () => {
		await checkA11y(page)
	})

	test.afterAll(async () => {
		await browser.close()
	})
})

test.describe('Browse', () => {
	test.beforeAll(async () => {
		browser = await chromium.launch()
		page = await browser.newPage()
		await page.goto(`http://localhost:3000/browse`)
		await injectAxe(page)
	})

	test('A11y run', async () => {
		await checkA11y(page)
	})

	test.afterAll(async () => {
		await browser.close()
	})
})

test.describe('Browse One Recipe', () => {
	test.beforeAll(async () => {
		browser = await chromium.launch()
		page = await browser.newPage()
		await page.goto(`http://localhost:3000/browse`)
		await injectAxe(page)
	})

	test('A11y run', async () => {
		await page.click('h1')
		await checkA11y(page)
	})

	test.afterAll(async () => {
		await browser.close()
	})
})

test.describe('Add Recipe', () => {
	test.beforeAll(async () => {
		browser = await chromium.launch()
		page = await browser.newPage()
		await page.goto(`http://localhost:3000/add`)
		await injectAxe(page)
	})

	test('A11y run', async () => {
		await checkA11y(page)
	})

	test.afterAll(async () => {
		await browser.close()
	})
})

test.describe('Search Recipe', () => {
	test.beforeAll(async () => {
		browser = await chromium.launch()
		page = await browser.newPage()
		await page.goto(`http://localhost:3000/search`)
		await injectAxe(page)
	})

	test('A11y run', async () => {
		await checkA11y(page)
	})

	test.afterAll(async () => {
		await browser.close()
	})
})
