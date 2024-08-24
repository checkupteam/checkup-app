import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JournalEntry } from "../types/journal";
import { RootState } from ".";
import { AuthState } from "../types/auth";

const initialState: AuthState = {
    token: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
    },
});

export const { setToken } = authSlice.actions;
export const selectToken = (state: RootState) => state.auth.token;
