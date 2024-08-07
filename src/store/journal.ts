import { createSlice } from "@reduxjs/toolkit";
import { JournalState } from "../types/journal";

const initialState: JournalState = {
    entires: [],
};

export const journalSlice = createSlice({
    name: "journal",
    initialState,
    reducers: {
        addEntry: (state, action) => {
            state.entires.push(action.payload);
        },
    },
});

export const {} = journalSlice.actions;
