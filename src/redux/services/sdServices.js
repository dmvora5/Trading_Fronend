import { AXIOS } from "@/utils";


export const getSdStatergysService = async (query) => {
    const response = await AXIOS.get("sd", {
        params: {
            type: query
        }
    });
    return response.data;
}

export const createSdStatergysService = async (payload) => {
    const response = await AXIOS.post("sd", payload);
    return response.data;
};

export const deleteSdStatergysService = async (id) => {
    const response = await AXIOS.delete("sd/" + id);
    return response.data;
};

export const reRunSdStatergysService = async () => {
    const response = await AXIOS.post("sd/re-run");
    return response.data;
};