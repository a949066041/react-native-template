import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
}, {
  ignores: ['dist'],
  rules: {
    'node/prefer-global/process': 'off',
    'ts/no-require-imports': 'off',
  },
})
