const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/global_init.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "adInventory.umd.js", // Main bundle
    chunkFilename: "adInventory.[name].[contenthash].js", // Dynamic imports
    library: "adInventory",
    libraryTarget: "umd",
    globalObject: "this"
  }
};
