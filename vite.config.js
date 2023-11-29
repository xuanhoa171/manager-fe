import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from 'dotenv';

export default defineConfig((props) => {
  console.log('props', props);
  const { mode } = props;
  const env = mode === 'https' ? dotenv.config({ path: '.env.production' }).parsed : dotenv.config({ path: '.env.development' }).parsed;

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './node_modules'),
        '~': path.resolve(__dirname, './src')
      }
    },
    define: {
      'process.env': Object.keys(env).reduce((prev, next) => {
        prev[`import.meta.env.${next}`] = JSON.stringify(env[next]);
        return prev;
      }, {})
    }
  };
});
