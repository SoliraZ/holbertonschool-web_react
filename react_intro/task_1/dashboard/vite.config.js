const path = require('path')
const { defineConfig } = require('vite')
const react = require('@vitejs/plugin-react')

/**
 * src/utils.js uses module.exports for Node (Holberton checker require()).
 * Browsers need ESM; rewrite only inside Vite's pipeline (dev + build).
 */
function viteUtilsCjsAsEsm() {
  return {
    name: 'vite-utils-cjs-as-esm',
    enforce: 'pre',
    transform(code, id) {
      const normalized = id.split(path.sep).join('/')
      if (!normalized.endsWith('/src/utils.js')) return null
      if (!code.includes('module.exports')) return null
      const next = code.replace(
        /\bmodule\.exports\s*=\s*\{\s*getCurrentYear\s*,\s*getFooterCopy\s*\}\s*;?/m,
        'export { getCurrentYear, getFooterCopy }'
      )
      return next === code ? null : next
    },
  }
}

module.exports = defineConfig({
  plugins: [viteUtilsCjsAsEsm(), react()],
})
