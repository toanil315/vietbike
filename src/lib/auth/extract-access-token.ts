type UnknownObject = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownObject {
  return typeof value === "object" && value !== null;
}

function pickTokenFromRecord(record: UnknownObject): string | null {
  const keys = ["accessToken", "token", "jwt", "idToken"];

  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }

  return null;
}

export function extractAccessToken(payload: unknown): string | null {
  if (!isRecord(payload)) {
    return null;
  }

  const direct = pickTokenFromRecord(payload);
  if (direct) {
    return direct;
  }

  const data = payload.data;
  if (isRecord(data)) {
    const nested = pickTokenFromRecord(data);
    if (nested) {
      return nested;
    }
  }

  return null;
}
