import axios from "axios";
import { setAxiosDefaults } from "./common";
import { CLIParameters, UpdateCLIParametersInput, createCLIParametersInput } from "../models/CLIParameters";
import { deserializeRecord } from "./common";
setAxiosDefaults(axios)


export default class CLIParametersService{

    private signal: AbortSignal;

    constructor(externalSignal : AbortSignal){
        this.signal = externalSignal;
    }

 async  createCLIParameters (cliParameters: createCLIParametersInput) : Promise<CLIParameters | null>{
    try{
        const {data: {data: createdCLIParameters}} = await axios.post(`/cli-parameters`, cliParameters );
        return deserializeRecord<CLIParameters>(createdCLIParameters);
    }
    catch(error){
        console.error(error);
    }

    return null;
}

 async  updateCLIParameters(cliParameterstInput: UpdateCLIParametersInput): Promise<CLIParameters | null>{
    try{
        const {data: {data:updatedCLIParameters}} = await axios.patch(`/cli-parameters/${cliParameterstInput.id}`, cliParameterstInput);
        return deserializeRecord<CLIParameters>(updatedCLIParameters);
    }

    catch(error){
        console.error(error);
    }
    return null;
}

 async  deleteCLIParameters(id: number) : Promise<boolean> {
    try {
        await axios.delete(`/cli-parameters/${id}`);
        return true;
    }
    catch(error){
        console.error(error);
    }


    return false;
}

}
