import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Plugin to handle figma:asset imports
function figmaAssetPlugin() {
  return {
    name: 'figma-asset-plugin',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        return id;
      }
      return null;
    },
    load(id: string) {
      if (id.startsWith('figma:asset/')) {
        // Extract the hash from the import
        const hash = id.replace('figma:asset/', '');
        // Return a data URL or placeholder for local builds
        // This prevents build errors while maintaining the import structure
        return `export default "https://via.placeholder.com/1200x800/1a1a1a/A8E6A3?text=Asset"`;
      }
      return null;
    }
  };
}

export default defineConfig({
  plugins: [react(), figmaAssetPlugin()],
  base: './',
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
