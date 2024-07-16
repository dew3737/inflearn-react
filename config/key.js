if (process.env.NODE_END === "production") {
  module.export = require("./prod");
} else {
  module.export = require("./dev");
}
