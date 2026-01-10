import * as Sentry from "@sentry/astro";

Sentry.init({
  dsn: "https://05878b39fc61df5f4020a065bcf84d79@o4510688362954752.ingest.us.sentry.io/4510688369049600",
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/astro/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});