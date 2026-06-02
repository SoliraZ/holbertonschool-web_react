import { test, expect } from '@playwright/test'

test.use({ viewport: { width: 430, height: 979 } })

test('Course list page responsive layout matches reference', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveScreenshot('responsive-1.png', { fullPage: true })
})
