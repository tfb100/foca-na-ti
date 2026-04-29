import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    // Desativa a notificação "compiling" piscante no canto inferior da tela
    buildActivity: false,
    appIsrStatus: false,
  },
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

export default nextConfig;
