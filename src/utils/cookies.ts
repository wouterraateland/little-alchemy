export const readCookieIsomorphic = async (key: string) => {
  if (typeof window === "object") {
    for (const cookie of document.cookie.split("; ")) {
      const [encodedKey, ...encodedValueParts] = cookie.split("=");
      if (!encodedKey) continue;
      const cookieKey = decodeURIComponent(encodedKey);
      if (cookieKey !== key) continue;

      let value = encodedValueParts.join("=");
      if (value.startsWith('"')) value = value.slice(1, -1);
      return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
    }
    return null;
  }

  const { cookies } = await import("next/headers");
  const cookiesList = await cookies();
  return cookiesList.get(key)?.value ?? null;
};

const cookieOptions = () =>
  window.location.protocol === "https:"
    ? ({ path: "/", sameSite: "none", secure: true } as const)
    : ({ path: "/" } as const);

export const setCookie = (key: string, value: string) => {
  if (typeof document === "undefined") return;

  const encodedKey = encodeURIComponent(key).replace(
    /%(2[346B]|5E|60|7C)/g,
    decodeURIComponent,
  );
  // .replace(/[()]/g, escape);
  const encodedValue = encodeURIComponent(value).replace(
    /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
    decodeURIComponent,
  );

  const attributes = {
    ...cookieOptions(),
    expires: new Date(Date.now() + 365 * 864e5).toUTCString(),
  };
  let stringifiedAttributes = "";
  for (const [attribute, value] of Object.entries(attributes)) {
    stringifiedAttributes += "; " + attribute;
    if (value !== true) stringifiedAttributes += "=" + value;
  }

  document.cookie = encodedKey + "=" + encodedValue + stringifiedAttributes;
};

export const clearCookie = (key: string) => {
  if (typeof document === "undefined") return;

  const encodedKey = encodeURIComponent(key).replace(
    /%(2[346B]|5E|60|7C)/g,
    decodeURIComponent,
  );

  const attributes = {
    ...cookieOptions(),
    expires: new Date(Date.now() - 1).toUTCString(),
  };
  let stringifiedAttributes = "";
  for (const [attribute, value] of Object.entries(attributes)) {
    stringifiedAttributes += "; " + attribute;
    if (value !== true) stringifiedAttributes += "=" + value;
  }

  document.cookie = encodedKey + "=" + stringifiedAttributes;
};
