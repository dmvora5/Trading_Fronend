import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSdStatergysService, deleteSdStatergysService, getSdStatergysService, reRunSdStatergysService } from "../services/sdServices";
import { Toast } from "@/components/Toast/Toast";
import { AxiosError } from "axios";
import { STATERGY_TYPE } from "@/constant";





export const getAllSdStatergyAction = createAsyncThunk(
    "stcturalSd/getAllSdStatergyAction",
    async (payload, { rejectWithValue }) => {
        try {
            console.log('payload', payload)
            const { data, message } = await getSdStatergysService(payload);

            return data
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

export const getAllSdFilterAction = createAsyncThunk(
    "stcturalSd/getAllSdFilterAction",
    async (payload, { rejectWithValue }) => {
        try {
            const { data, message } = await getSdStatergysService(payload);
            console.log('data', data)
            return data
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
            if(success) {
                if(payload.type === STATERGY_TYPE.INTERVAL) {
                    dispatch(getAllSdStatergyAction(payload.type));
                } else {
                    dispatch(getAllSdFilterAction(payload.type));
                }
                Toast.success(message || 'Success');
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

export const deleteSdStatergyAction = createAsyncThunk(
    "stcturalSd/deleteSdStatergyAction",
    async (payload, { dispatch, rejectWithValue }) => {
        try {
            const { data, message, success } = await deleteSdStatergysService(payload._id);
            if(success) {
                if(payload.type === STATERGY_TYPE.INTERVAL) {
                    dispatch(getAllSdStatergyAction(payload.type));
                } else {
                    dispatch(getAllSdFilterAction(payload.type));
                }
                Toast.success(message || 'Success');
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


export const reRunSdStatergyAction = createAsyncThunk(
    "stcturalSd/reRunSdStatergyAction",
    async (_, { rejectWithValue }) => {
        try {
            const { data, message, success } = await reRunSdStatergysService();
            console.log('message', message)
            if(success && message) {
                Toast.success(message);
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