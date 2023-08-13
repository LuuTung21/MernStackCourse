import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        //  This setCredential reducer function is used to save the userInfo state into the local storage.
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem("userInfo");
        }
    }
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;