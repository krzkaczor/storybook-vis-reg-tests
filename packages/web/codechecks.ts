import { codechecks } from "@codechecks/client";

// disabling faulty rules
// tslint:disable:no-useless-cast restrict-plus-operands
export async function main(): Promise<void> {
  await checkPackageLock();
  await checkSmartContractGitModules();
}

async function checkPackageLock(): Promise<void> {
  if (!codechecks.isPr()) {
    return;
  }
  const hasPackageLock = codechecks.context.pr!.files.added.includes("package-lock.json");

  if (hasPackageLock) {
    await codechecks.failure({
      name: "Package lock detected",
      shortDescription: "Do not use npm, use yarn instead.",
    });
  }
}

// TODO: checkSmartContractGitModules is still not working
async function checkSmartContractGitModules(): Promise<void> {
  if (!codechecks.isPr()) {
    return;
  }
  const updatesContracts = (
    codechecks.context.pr!.meta.body + codechecks.context.pr!.meta.title
  ).includes("#with-contracts");

  const hasContractSubmodule = codechecks.context.pr!.files.changed.some((p: string) =>
    p.includes("platform-contracts-artifacts/"),
  );

  if (hasContractSubmodule && !updatesContracts) {
    await codechecks.failure({
      name: "Smart Contracts Submodule",
      shortDescription:
        "Detected platform-contracts-artifacts in your PR, most likely this is by mistake please push alone",
    });
  }
}
