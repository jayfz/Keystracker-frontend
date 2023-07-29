import {AxiosResponse } from "axios";
import { DatabaseRecord } from "../models/common";
import { sleep } from "@/Utilities";
import axios from "axios";


export const client = axios.create({
    baseURL: import.meta.env.VITE_SERVER_ENDPOINT_URL,
})


client.interceptors.request.use(artificialNetworkDelay)
client.interceptors.response.use(responseProcessing)



export function deserializeRecord<T extends DatabaseRecord> (record:T): T{
    record.createdAt = new Date(record.createdAt)
    record.updatedAt = new Date(record.updatedAt)
    return record;
}


async function artificialNetworkDelay(config: any){
    if (import.meta.env.DEV){
        await sleep(import.meta.env.VITE_ARTIFICIAL_NETWORK_DELAY_IN_MILISECONDS);
    }

    return config;
}


async function responseProcessing(response: AxiosResponse){
    return response.data;
}