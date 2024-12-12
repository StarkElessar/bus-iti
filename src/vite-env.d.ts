/// <reference types="vite/client" />

interface ImportMetaEnv {
	 readonly VITE_LOCAL_API_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
