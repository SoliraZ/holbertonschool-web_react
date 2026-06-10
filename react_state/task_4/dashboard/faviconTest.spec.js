import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(process.cwd())

describe('favicon (checker)', () => {
  test('favicon.ico exists in public/', () => {
    expect(fs.existsSync(path.join(root, 'public/favicon.ico'))).toBe(true)
  })

  test('index.html links favicon in head', () => {
    const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8')
    expect(html).toMatch(
      /<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*href=["']favicon\.ico["'][^>]*>/i,
    )
  })
})
