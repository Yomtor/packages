const path = require("path");
const { argv } = require("yargs");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin").default;

const storiesPath = !argv._[0]
  ? path
      .resolve(__dirname, "../../src/yomtor-*/src/**/*.stories.@(ts|tsx)")
      .replace(/\\/g, "/")
  : path
      .resolve(
        __dirname,
        `../../src/yomtor-${argv._[0].replace(
          "@yomtor/",
          ""
        )}/src/**/*.stories.@(ts|tsx)`
      )
      .replace(/\\/g, "/");

module.exports = {
  stories: [storiesPath],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-dark-mode/register",
  ],
  webpackFinal: async (config) => {
    config.resolve = {
      ...config.resolve,
      plugins: [
        ...(config.resolve.plugins || []),
        new TsconfigPathsPlugin({
          extensions: [".ts", ".tsx", ".js"],
          configFile: path.join(__dirname, "../../tsconfig.json"),
        }),
      ],
    };

    // Turn off docgen plugin as it breaks bundle with displayName
    config.plugins.pop();

    return config;
  },
};
