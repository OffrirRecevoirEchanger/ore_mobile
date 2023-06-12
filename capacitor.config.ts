import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ca.technolibre.ore',
  appName: 'ore_mobile',
  webDir: 'dist/ore_mobile',
  server: {
    androidScheme: 'https'
  }
};

export default config;
