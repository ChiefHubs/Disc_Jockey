/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VERSION: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_WEBSITE_NAME: string;
  readonly VITE_DJFAN_API_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
