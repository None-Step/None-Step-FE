import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: "category",
    initialState: { value: { category: "" } },
    reducers: {
        selectedCategory: (state, action) => {
            state.value = action.payload;
        },
    },
});

export default categorySlice.reducer;

export const { selectedCategory } = categorySlice.actions;
