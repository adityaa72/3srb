module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          "@": "./src",
          "@validations": "../common/validations",
          "@constants": "../common/constants",
          "@utils": "../common/utils",
        },
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
