/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // обработка файлов .tsx
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass|svg)$': 'identity-obj-proxy', // обработка статических файлов
    '^.+\\.svg$': 'jest-svg-transformer', // обработка SVG
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  //setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // опционально, для инициализации окружения
};
