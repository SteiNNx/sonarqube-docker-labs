module.exports = {
    testEnvironment: 'node',
    testMatch: [
        '**/__tests__/src/**/*.test.js',
        '**/__tests__/src/**/*.spec.js',
        '**/__tests__/scripts/**/*.test.js',
        '**/?(*.)+(spec|test).js'
    ],
    moduleFileExtensions: ['js', 'json', 'node'],
    testPathIgnorePatterns: ['/node_modules/', '/code/'],
    moduleNameMapper: {
        '^@src/(.*)$': '<rootDir>/src/$1'
    }
};
