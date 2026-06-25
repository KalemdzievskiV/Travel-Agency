import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow loading the dev server from these origins (e.g. testing on a phone
  // over the LAN). Without this, Next blocks cross-origin /_next/* dev
  // resources — including the HMR websocket. Add more hosts/IPs as needed.
  allowedDevOrigins: ["192.168.100.29"],
};

export default nextConfig;
