import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Plugin to handle figma:asset imports
function figmaAssetPlugin() {
  return {
    name: 'figma-asset-plugin',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        // Return the id with a null byte prefix to mark it as external but handled
        return '\0' + id;
      }
      return null;
    },
    load(id: string) {
      if (id.startsWith('\0figma:asset/')) {
        // Extract the hash from the import
        const actualId = id.slice(1); // Remove the null byte
        const hash = actualId.replace('figma:asset/', '');
        // Return a module that exports the asset path
        // In production, this will be the actual figma asset URL
        return `export default "figma:asset/${hash}"`;
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
  },
  build: {
    rollupOptions: {
      external: []
    }
  }
});