import { createSlice } from "@reduxjs/toolkit";
import { createSdStatergyAction, deleteSdStatergyAction, getAllSdFilterAction, getAllSdStatergyAction, reRunSdStatergyAction } from "../actions/strucralSdActions";


const initialState = {
    loading: false,
    statergies: [],
    filters: [],
    eventData: {},
    activeMenu: null
}


const strucralSdSlice = createSlice({
    name: "stcturalSd",
    initialState,
    reducers: {
        setActiveMenu: (state, { payload }) => {
            state.activeMenu = payload
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

            // getAllSdFilterAction
            .addCase(getAllSdFilterAction.pending, (state,) => {
                state.loading = true;
            })
            .addCase(getAllSdFilterAction.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.filters = payload;
            })
            .addCase(getAllSdFilterAction.rejected, (state,) => {
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

            // deleteSdStatergyAction
            .addCase(deleteSdStatergyAction.pending, (state,) => {
                state.loading = true;
            })
            .addCase(deleteSdStatergyAction.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteSdStatergyAction.rejected, (state,) => {
                state.loading = false;
            })

            // reRunSdStatergyAction
            .addCase(reRunSdStatergyAction.pending, (state,) => {
                state.loading = true;
            })
            .addCase(reRunSdStatergyAction.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(reRunSdStatergyAction.rejected, (state,) => {
                state.loading = false;
            })
    }
})


export const sdReducer = strucralSdSlice.reducer;

export const {
    setActiveMenu
} = strucralSdSlice.actions;


export const sdState = (state) => state.stcturalSd;