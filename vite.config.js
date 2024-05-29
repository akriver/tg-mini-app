// import { readFileSync } from 'node:fs';
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/huzhan-mini-app/",
  plugins: [react(), basicSsl()],
  //plugins: [react()],
  // Uncomment the next lines in case, you would like to run Vite dev server using HTTPS and in case,
  // you have key and certificate. You retrieve your certificate and key using mkcert.
  // Learn more:
  // https://docs.telegram-mini-apps.com/platform/getting-app-link#mkcert
  //
  // server: {
  //   port: 443,
  //   https: {
  //     cert: readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), './tma.internal.pem')),
  //     key: readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), './tma.internal-key.pem')),
  //   },
  //   host: 'tma.internal',
  // },
  server: {
    https: true,
  },
  resolve: {
    alias: {
      "@": resolve(dirname(fileURLToPath(import.meta.url)), "./src"),
    },
  },
  publicDir: "./public",
});
