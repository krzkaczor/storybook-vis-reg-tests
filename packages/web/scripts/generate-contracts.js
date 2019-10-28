const tc = require("typechain");
const path = require("path");
const fs = require("fs");

const { getArtifactsMeta, getArtifactsPath } = require("./getArtifacts");
const loadAppEnv = require("../webpack/loadAppEnv");
const { getArtifactsRelativePath } = require("./getArtifacts");

loadAppEnv(process.env);

const artifactsVersion = process.env.NF_CONTRACT_ARTIFACTS_VERSION || "localhost";

const outDir = "app/lib/contracts";

// @ts-ignore
global.IS_CLI = true;

async function generateKnownInterfaces() {
  const { KNOWN_INTERFACES } = getArtifactsMeta(artifactsVersion);
  fs.writeFileSync(
    path.resolve(__dirname, "..", outDir, "knownInterfaces.json"),
    JSON.stringify(KNOWN_INTERFACES, null, "  "),
  );
}

tc.generateTypeChainWrappers({
  outDir,
  glob: `${getArtifactsRelativePath(artifactsVersion)}/contracts/*.json`,
  force: true,
})
  .catch(e => {
    console.error("Failed to generate typechain contract wrappers");
    console.error(e.message);
    process.exit(1);
  })
  .then(() => generateKnownInterfaces())
  .catch(e => {
    console.error("Failed to read meta.json and generate knownInterfaces.json");
    console.error(e.message);
    process.exit(1);
  });
