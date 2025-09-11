import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
<<<<<<< HEAD
import pluginOxlint from 'eslint-plugin-oxlint'
=======
>>>>>>> f04999ac88457181540a72bfe2d07f0caab1b97b
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
<<<<<<< HEAD
  ...pluginOxlint.configs['flat/recommended'],
=======
>>>>>>> f04999ac88457181540a72bfe2d07f0caab1b97b
  skipFormatting,
])
