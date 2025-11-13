const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/global_init.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "adInventory.umd.js",
    library: "adInventory",
    libraryTarget: "umd",
    globalObject: "this"
  }
};
