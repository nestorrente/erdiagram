module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	collectCoverage: true,
	coverageDirectory: 'coverage',
	testPathIgnorePatterns: [
		'/node_modules/'
	],
	verbose: true,
	roots: [
		'<rootDir>/src'
	],
	moduleNameMapper: {
		'@/(.*)': '<rootDir>/src/main/$1',
	}
};
