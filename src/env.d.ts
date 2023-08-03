/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SERVER_ENDPOINT_URL: string
    readonly VITE_ARTIFICIAL_NETWORK_DELAY_IN_MILISECONDS: number
    readonly VITE_WEBSOCKET_ENDPOINT_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}