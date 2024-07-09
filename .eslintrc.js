module.exports = {
  extends: ['@it-incubator/eslint-config'],
  rules: {
    '@typescript-eslint/ban-types': [
      'warn',
      {
        extendDefaults: true,
        types: {
          null: {
            message: '--- Используй Nullable<T> = T | null ---',
            // fixWith: 'Nullable<>', // Nullable<T> = null | T
          },
        },
      },
    ],
    'max-lines': ['warn', { max: 300 }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
}
