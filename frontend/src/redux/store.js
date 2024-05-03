import { configureStore } from "@reduxjs/toolkit";
import sliceOne from "./features/slices/SliceOne"
const store = configureStore({
    reducer: {
        data : sliceOne,
    }
})

export default store