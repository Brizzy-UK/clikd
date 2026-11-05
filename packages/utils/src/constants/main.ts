export const SHORT_DOMAIN = "clikd.uk";
export const APP_HOSTNAME = `app.${SHORT_DOMAIN}`;
export const API_HOSTNAME = `api.${SHORT_DOMAIN}`;

export const API_HOSTNAMES = new Set([
  API_HOSTNAME,
  "api.localhost:8888",
  "api.localhost",
]);

export const API_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `https://${API_HOSTNAME}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
      ? `https://${API_HOSTNAME}`
      : "http://api.localhost:8888";

export const APP_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `https://${APP_HOSTNAME}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL || APP_HOSTNAME}`
      : "http://localhost:8888";

export const APP_DOMAIN_WITH_NGROK =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `https://${APP_HOSTNAME}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL || APP_HOSTNAME}`
      : process.env.NEXT_PUBLIC_NGROK_URL || "http://localhost:8888";

export const isAppHostname = (hostname: string) => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") {
    // Vercel preview deployments are served from *.vercel.app
    return hostname.endsWith(".vercel.app");
  }
  return new Set([APP_HOSTNAME, "localhost:8888", "localhost"]).has(hostname);
};

export const DUB_LOGO = "https://assets.dub.co/logo.png";
export const DUB_LOGO_SQUARE = "https://assets.dub.co/logo-square.png";
export const DUB_QR_LOGO = "https://assets.dub.co/logo.png";
export const DUB_WORDMARK = "https://assets.dub.co/wordmark.png";
export const DUB_THUMBNAIL = "https://assets.dub.co/thumbnail.jpg";

export const DUB_WORKSPACE_ID = "cl7pj5kq4006835rbjlt2ofka";
export const ACME_WORKSPACE_ID = "clrei1gld0002vs9mzn93p8ik";
export const LEGAL_WORKSPACE_ID = "clrflia0j0000vs7sqfhz9c7q";
export const LEGAL_USER_ID = "clqei1lgc0000vsnzi01pbf47";

export const R2_URL = process.env.STORAGE_BASE_URL || "https://dubassets.com";
