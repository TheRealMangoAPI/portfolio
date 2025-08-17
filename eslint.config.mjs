import antfu from '@antfu/eslint-config'
import nextPlugin from '@next/eslint-plugin-next'

export default antfu({
  react: true, typescript: true, nextjs: true, formatters: true
}, {
  plugins: {
    '@next/next': nextPlugin
  }, rules: {
    ...nextPlugin.configs.recommended.rules, ...nextPlugin.configs['core-web-vitals'].rules
  }
})
