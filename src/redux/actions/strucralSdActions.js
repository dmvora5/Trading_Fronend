import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSdStatergysService, getSdStatergysService } from "../services/sdServices";
import { Toast } from "@/components/Toast/Toast";
import { AxiosError } from "axios";





export const getAllSdStatergyAction = createAsyncThunk(
    "stcturalSd/getAllSdStatergyAction",
    async (_, { rejectWithValue }) => {
        try {
            const { data, message } = await getSdStatergysService();

            return data;
        } catch (err) {
            if (err instanceof AxiosError) {
                Toast.error(err.response.data?.message);
                return rejectWithValue(null);
            }
            Toast.error(err.message);
            rejectWithValue(null);
        }
    }
);

export const createSdStatergyAction = createAsyncThunk(
    "stcturalSd/createSdStatergyAction",
    async (payload, { dispatch, rejectWithValue }) => {
        try {
            const { data, message, success } = await createSdStatergysService(payload);
            Toast.success(message || 'Success');
            if(success) {
                dispatch(getAllSdStatergyAction());
            }
            return data;
        } catch (err) {
            if (err instanceof AxiosError) {
                Toast.error(err.response.data?.message);
                return rejectWithValue(null);
            }
            console.log('err.message', err.message)
            Toast.error(err.message);
            rejectWithValue(null);
        }
    }
)