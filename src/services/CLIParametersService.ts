import { client as axiosClient } from "./common";
import { CLIParameters, UpdateCLIParametersInput, createCLIParametersInput } from "../models/CLIParameters";
import { deserializeRecord } from "./common";


export default class CLIParametersService{

    private signal: AbortSignal;

    constructor(externalSignal : AbortSignal){
        this.signal = externalSignal;
    }

 async  createCLIParameters (cliParameters: createCLIParametersInput) : Promise<CLIParameters | null>{
    try{
        const {data: createdCLIParameters} = await axiosClient.post(`/cli-parameters`, cliParameters, {signal: this.signal} );
        return deserializeRecord<CLIParameters>(createdCLIParameters);
    }
    catch(error){
        console.error(error);
    }

    return null;
}

 async  updateCLIParameters(cliParameterstInput: UpdateCLIParametersInput): Promise<CLIParameters | null>{
    try{
        const {data:updatedCLIParameters} = await axiosClient.patch(`/cli-parameters/${cliParameterstInput.id}`, cliParameterstInput, {signal: this.signal});
        return deserializeRecord<CLIParameters>(updatedCLIParameters);
    }

    catch(error){
        console.error(error);
    }
    return null;
}

 async  deleteCLIParameters(id: number) : Promise<boolean> {
    try {
        await axiosClient.delete(`/cli-parameters/${id}`, {signal: this.signal});
        return true;
    }
    catch(error){
        console.error(error);
    }


    return false;
}

}
