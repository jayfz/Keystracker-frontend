/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SERVER_ENDPOINT_URL: string
    readonly VITE_ARTIFICIAL_NETWORK_DELAY_IN_MILISECONDS: number
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}