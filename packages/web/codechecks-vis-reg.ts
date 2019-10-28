import { codechecks } from "@codechecks/client";
import * as exec from "await-exec";
import { join } from "path";

export async function main(): Promise<void> {
  await visReg();
}

async function visReg(): Promise<void> {
  const execOptions = { timeout: 300000, cwd: process.cwd(), log: true };
  await codechecks.saveCollection("storybook-vis-reg", join(__dirname, "__screenshots__"));

  if (codechecks.isPr()) {
    await codechecks.getCollection("storybook-vis-reg", join(__dirname, ".reg/expected"));
    await exec("./node_modules/.bin/reg-suit compare", execOptions);

    await codechecks.saveCollection("storybook-vis-reg-report", join(__dirname, ".reg"));

    const reportData = require("./.reg/out.json");
    await codechecks.success({
      name: "Visual regression for Storybook",
      shortDescription: `Changed: ${reportData.failedItems.length}, New: ${
        reportData.newItems.length
      }, Deleted: ${reportData.deletedItems.length}`,
      detailsUrl: codechecks.getArtifactLink("/storybook-vis-reg-report/index.html"),
    });
  }
}
