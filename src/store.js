import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./Reducer/dataReducer";

const store = configureStore({
    reducer: {
        data: dataReducer,
    }
})

export default store;  