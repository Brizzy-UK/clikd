import { Index } from "@upstash/vector";

// Placeholders when unset (Dub-internal docs search): empty values make the
// Upstash Vector SDK throw on import, which breaks `next build`.
export const vectorIndex = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL || "https://vector.unset.invalid",
  token: process.env.UPSTASH_VECTOR_REST_TOKEN || "unset",
});
