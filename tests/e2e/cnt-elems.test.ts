import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test('count elems', async ({ page }) => {
  async function treeViewer(elem) {
    const total = new Set()
    
    const tagName = await elem.evaluate(el => el.tagName.toLowerCase())
    total.add(tagName)

    const children = await elem.locator('> *').all()
    for (const child of children) {
      const childTags = await treeViewer(child)
      childTags.forEach(tag => total.add(tag))
    }

    return total;
  }

  const set = await treeViewer(page.locator('body'))

  expect(set.size).toBeGreaterThan(30)
})