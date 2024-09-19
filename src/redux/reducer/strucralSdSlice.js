import { createSlice } from "@reduxjs/toolkit";
import {  createSdStatergyAction, getAllSdStatergyAction } from "../actions/strucralSdActions";




const initialState = {
    loading: false,
    statergies: [],
    eventData: {}
}




const strucralSdSlice = createSlice({
    name: "stcturalSd",
    initialState,
    reducers: {
        setEventDataAction: (state, { payload }) => {
            state.eventData[payload.name] = payload.data;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllSdStatergyAction.pending, (state,) => {
                state.loading = true;
            })
            .addCase(getAllSdStatergyAction.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.statergies = payload;
            })
            .addCase(getAllSdStatergyAction.rejected, (state,) => {
                state.loading = false;
            })

            // createSdStatergyAction
            .addCase(createSdStatergyAction.pending, (state,) => {
                state.loading = true;
            })
            .addCase(createSdStatergyAction.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createSdStatergyAction.rejected, (state,) => {
                state.loading = false;
            })
    }
})


export const sdReducer = strucralSdSlice.reducer;

export const {
    setEventDataAction
} = strucralSdSlice.actions;


export const sdState = (state) => state.stcturalSd;