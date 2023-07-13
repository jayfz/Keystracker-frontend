import {AxiosStatic } from "axios";
import { DatabaseRecord } from "../models/common";

export function setAxiosDefaults(axios: AxiosStatic){
axios.defaults.baseURL = 'http://localhost:8000/api/';
axios.defaults.headers.patch['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

}

export function deserializeRecord<T extends DatabaseRecord> (record:T): T{
    record.createdAt = new Date(record.createdAt)
    record.updatedAt = new Date(record.updatedAt)
    return record;
}