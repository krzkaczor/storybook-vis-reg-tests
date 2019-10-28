import * as detectBrowserModule from "detect-browser";

export type TBrowserName = detectBrowserModule.BrowserName | "node" | "unknown";

export type TDetectBrowser = () => { name: TBrowserName; version: string };

export const detectBrowser: TDetectBrowser = () => {
  const detectedBrowser = detectBrowserModule.detect();
  if (detectedBrowser) {
    return detectedBrowser;
  }

  return {
    name: "unknown",
    version: "0",
  };
};
