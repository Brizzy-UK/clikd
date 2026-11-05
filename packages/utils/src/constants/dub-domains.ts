import { DUB_WORKSPACE_ID, SHORT_DOMAIN } from "./main";

export const DUB_DOMAINS = [
  {
    id: "clikd_default_domain",
    slug: SHORT_DOMAIN,
    verified: true,
    primary: true,
    archived: false,
    placeholder: "https://example.com",
    allowedHostnames: [] as string[],
    description: "The default domain for all new accounts.",
    projectId: DUB_WORKSPACE_ID,
  },
];

export const DUB_DOMAINS_ARRAY = DUB_DOMAINS.map((domain) => domain.slug);

export const DUB_DEMO_LINKS: {
  id: string;
  domain: string;
  key: string;
  dashboardId: string;
}[] = [];
