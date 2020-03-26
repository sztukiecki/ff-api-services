module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node': true,
        'jest': true,
    },
    'globals': {
        'i18n': true,
        'buildRoutePath': true,
        'buildUrlPath': true,
        'guid': true,
        'Loader': true,
    },
    'extends': [
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true,
        },
        'project': './tsconfig.json',
        'sourceType': 'module',
    },
    'plugins': [
        '@typescript-eslint',
        'import',
    ],
    'rules': {
        'no-setter-return': 'error',
        'yoda': 'error',
        'no-unused-vars': 'warn',
        'import/no-internal-modules': [
            'error',
            {
                'allow': [
                    '**/actions/*',
                    'source-map-support/*',
                ],
            },
        ],
    },
};
