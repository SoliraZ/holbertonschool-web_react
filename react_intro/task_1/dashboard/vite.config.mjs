import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * On disk, src/utils.js stays CommonJS (module.exports) so Holberton's
 * node utilsFnTestRunner can use require('./src/utils.js').
 * Vite/Rollup need ESM named exports from that file during bundling.
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

export default defineConfig({
  plugins: [viteUtilsCjsAsEsm(), react()],
})
