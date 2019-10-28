/**
 * Prerendering drops HTML doctype so we are adding it back in this script.
 */
const { join } = require("path");
const fs = require("fs");

function fixPage(path) {
  const pageSource = fs.readFileSync(path, "utf-8");

  const fixedSource = "<!DOCTYPE html>\n" + pageSource;

  fs.writeFileSync(path, fixedSource, "utf-8");
}

fixPage(join(__dirname, "../dist/index.html"));
