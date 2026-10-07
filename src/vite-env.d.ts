/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_ID_URL: string
  readonly VITE_YM_ID: string
  readonly VITE_API_URL: string
  readonly VITE_WALLET_CONNECT_PROJECT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}