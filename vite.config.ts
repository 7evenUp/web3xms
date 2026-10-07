import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react-swc"
import svgr from "vite-plugin-svgr"
import path from "path"

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), "")

  return {
    server: {
      host: true,
      proxy: {
        "/api": {
          target: `${env.VITE_API_URL}`,
          changeOrigin: true,
          secure: true,
        },
      },
    },
    plugins: [react(), svgr()],
    resolve: {
      alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
  }
})
