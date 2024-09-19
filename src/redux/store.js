import { configureStore } from "@reduxjs/toolkit";
import { sdReducer } from "./reducer/strucralSdSlice";


const store = configureStore({
    reducer: {
        stcturalSd: sdReducer
    },
});



export default store