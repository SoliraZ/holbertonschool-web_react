import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(process.cwd())

describe('favicon (checker-style)', () => {
  test('favicon.ico exists in public/', () => {
    expect(fs.existsSync(path.join(root, 'public/favicon.ico'))).toBe(true)
  })

  test('index.html in project root links favicon in head', () => {
    const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8')
    expect(html).toMatch(/<head[\s\S]*?<\/head>/i)
    expect(html).toMatch(
      /<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*href=["']favicon\.ico["'][^>]*>/i,
    )
  })

  test('public/index.html links favicon for CRA-style checkers', () => {
    const html = fs.readFileSync(path.join(root, 'public/index.html'), 'utf8')
    expect(html).toMatch(
      /<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*href=["']favicon\.ico["'][^>]*>/i,
    )
  })
})
