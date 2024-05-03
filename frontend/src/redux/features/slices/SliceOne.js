import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export const fetchParents = createAsyncThunk("fetchParents", async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/v1/parent");
        return response.data;
    } catch (error) {
        console.log("error while fetching data from api ", error);
    }
});
export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/v1/categories");
        return response.data;
    } catch (error) {
        console.log("error while fetching data from api ", error);
    }
});
export const fetchSupplier = createAsyncThunk("fetchSupplier", async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/v1/supplier");
        return response.data;
    } catch (error) {
        console.log("error while fetching data from api ", error);
    }
});
export const fetchStaff = createAsyncThunk("fetchStaff", async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/v1/all_staff");
        return response.data;
    } catch (error) {
        console.log("error while fetching data from api ", error);
    }
});
export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/v1/products");
        return response.data;
    } catch (error) {
        console.log("error while fetching data from api ", error);
    }
});

const sliceOne = createSlice({
    name: "data",
    initialState: {
        parent: [],
        productCategoriesList:[],
        supplierList:[],
        staffList:[],
        productList:[],
        iserror: false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchParents.pending, (state) => {
            state.iserror = false;
        })
        builder.addCase(fetchParents.fulfilled, (state, action) => {
            state.parent = action.payload;
            state.iserror = false;
        })
        builder.addCase(fetchParents.rejected, (state) => {
            state.iserror = true;
        })
        builder.addCase(fetchCategories.pending, (state) => {
            state.iserror = false;
        })
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.productCategoriesList = action.payload.data;
            state.iserror = false;
        })
        builder.addCase(fetchCategories.rejected, (state) => {
            state.iserror = true;
        })
        builder.addCase(fetchSupplier.pending, (state) => {
            state.iserror = false;
        })
        builder.addCase(fetchSupplier.fulfilled, (state, action) => {
            state.supplierList = action.payload;
            state.iserror = false;
        })
        builder.addCase(fetchSupplier.rejected, (state) => {
            state.iserror = true;
        })
        builder.addCase(fetchStaff.pending, (state) => {
            state.iserror = false;
        })
        builder.addCase(fetchStaff.fulfilled, (state, action) => {
            state.staffList = action.payload;
            state.iserror = false;
        })
        builder.addCase(fetchStaff.rejected, (state) => {
            state.iserror = true;
        })
        builder.addCase(fetchProducts.pending, (state) => {
            state.iserror = false;
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.productList = action.payload;
            state.iserror = false;
        })
        builder.addCase(fetchProducts.rejected, (state) => {
            state.iserror = true;
        })
    }
})

export default sliceOne.reducer;
