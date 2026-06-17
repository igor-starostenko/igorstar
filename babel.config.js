const config = {
  presets: [
    [
      "next/babel",
      {
        "preset-env": { targets: { node: "current" }, modules: false },
        "preset-react": { runtime: "automatic" }
      }
    ]
  ],
  plugins: ["styled-components"]
};

export default config;
