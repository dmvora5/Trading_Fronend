import { AXIOS } from "@/utils";


export const getSdStatergysService = async () => {
    const response = await AXIOS.get("/sd");
    return response.data;
}

export const createSdStatergysService = async (payload) => {
    const response = await AXIOS.post("/sd", payload);
    return response.data;
};