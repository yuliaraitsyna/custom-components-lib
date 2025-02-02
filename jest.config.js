module.exports = {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
    collectCoverageFrom: ['**/*.{ts,tsx}','!**/node_modules/**'],
    coverageThreshold: {
      global: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
    moduleNameMapper: {
      "\\.css$": "identity-obj-proxy",
      "^.+\\.svg$": "jest-svg-transformer",
    },
};
