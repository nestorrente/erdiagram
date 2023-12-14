module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverageFrom: [
        'src/main/**/*.{ts,js}',
        '!src/main/**/*.d.ts',
        '!src/main/**/exports.ts',
        '!src/main/module-entry.ts',
        '!src/main/standalone-entry.js'
    ],
    coverageDirectory: 'coverage',
    coverageReporters: [
        'json-summary',
        'text',
        'lcov'
    ],
    testPathIgnorePatterns: [
        '/node_modules/'
    ],
    verbose: false,
    roots: [
        '<rootDir>/src'
    ],
    moduleNameMapper: {
        '@/(.*)?': '<rootDir>/src/main/$1',
        '#/(.*)?': '<rootDir>/src/test/$1',
    },
    transform: {
        '\\.sql$': '@glen/jest-raw-loader'
    }
};
