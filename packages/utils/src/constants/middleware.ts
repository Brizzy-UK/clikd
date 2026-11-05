import { APP_HOSTNAME } from "./main";

export const DEFAULT_REDIRECTS = {
  home: `https://${APP_HOSTNAME}`,
  dub: `https://${APP_HOSTNAME}`,
  signin: `https://${APP_HOSTNAME}/login`,
  login: `https://${APP_HOSTNAME}/login`,
  register: `https://${APP_HOSTNAME}/register`,
  signup: `https://${APP_HOSTNAME}/register`,
  app: `https://${APP_HOSTNAME}`,
  dashboard: `https://${APP_HOSTNAME}`,
  links: `https://${APP_HOSTNAME}/links`,
  settings: `https://${APP_HOSTNAME}/settings`,
  welcome: `https://${APP_HOSTNAME}/onboarding/welcome`,
  discord: "https://twitter.com/dubdotco", // placeholder for now
};

export const DUB_HEADERS = {
  "x-powered-by": "Dub - The Modern Link Attribution Platform",
};

export const REDIRECTION_QUERY_PARAM = "redir_url";
