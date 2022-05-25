module.exports = {
  roots: ["<rootDir>/test", "<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testEnvironmentOptions: {
    resources: "usable",
  },
  testEnvironment: "jsdom",
  testURL: "http://www.google.es",
};
