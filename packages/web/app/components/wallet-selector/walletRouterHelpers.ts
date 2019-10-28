import { appRoutes } from "../appRoutes";

export function getRedirectionUrl(rootPath: string): string {
  const { loginIssuer, registerIssuer, registerNominee } = appRoutes;

  switch (rootPath) {
    case loginIssuer:
    case registerIssuer:
      return `${rootPath}/ledger`;
    case registerNominee:
      return `${rootPath}/light`;
    default:
      return `${rootPath}/light`;
  }
}
