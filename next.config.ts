import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Allow loading the dev server from these origins (e.g. testing on a phone
  // over the LAN). Without this, Next blocks cross-origin /_next/* dev
  // resources — including the HMR websocket. Add more hosts/IPs as needed.
  allowedDevOrigins: ["192.168.100.29"],
  experimental: {
    serverActions: {
      // Admin forms post images through a Server Action, whose body defaults to
      // a 1 MB cap — a larger photo 413s ("Body exceeded 1 MB limit"). Raised to
      // 4 MB, just under Vercel's ~4.5 MB serverless request ceiling, which is
      // the real hard limit on the deployed site.
      bodySizeLimit: "4mb",
    },
  },
};

export default withNextIntl(nextConfig);
