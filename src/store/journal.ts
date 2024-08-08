import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JournalEntry, JournalState } from "../types/journal";
import { RootState } from ".";

const initialState: JournalState = {
    entires: [],
};

export const journalSlice = createSlice({
    name: "journal",
    initialState,
    reducers: {
        addEntry: (state, action: PayloadAction<JournalEntry>) => {
            state.entires.push(action.payload);
        },
        updateEntry: (
            state,
            action: PayloadAction<Partial<JournalEntry> & { index: number }>
        ) => {
            state.entires[action.payload.index] = {
                ...state.entires[action.payload.index],
                ...action.payload,
            };
        },
    },
});

export const { addEntry: addJournalEntry, updateEntry: updateJournalEntry } =
    journalSlice.actions;
export const selectJournalEntires = (state: RootState) => state.journal.entires;
