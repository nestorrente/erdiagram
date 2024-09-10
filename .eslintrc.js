module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
        'no-console': 'error',
        '@typescript-eslint/naming-convention': [
			// TODO enable and fix the errors at some point
            'off',
            {
                selector: 'memberLike',
                modifiers: [
                    'private'
                ],
                format: [
                    'camelCase'
                ],
                'leadingUnderscore': 'require'
            }
        ]
    },
    overrides: [
        {
            files: [
                'src/test/**/*.spec.ts'
            ],
            env: {
                jest: true
            }
        }
    ]
}
