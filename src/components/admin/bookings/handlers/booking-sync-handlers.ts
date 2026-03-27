import { SetSyncTargetPayload } from "@/types";

export function buildSetSyncTargetPayload(
  spreadsheetId: string,
  sheetName?: string,
): SetSyncTargetPayload {
  return {
    spreadsheetId: spreadsheetId.trim(),
    sheetName: sheetName?.trim() || "Sheet1",
  };
}
