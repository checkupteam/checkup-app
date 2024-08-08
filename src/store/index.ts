import { configureStore } from "@reduxjs/toolkit";
import { journalSlice } from "./journal";
import { Drivers, Storage } from "@ionic/storage";
import cordovaSQLiteDriver from "localforage-cordovasqlitedriver";

const storage = new Storage({
    driverOrder: [
        cordovaSQLiteDriver._driver,
        Drivers.IndexedDB,
        Drivers.LocalStorage,
    ],
});

await storage.defineDriver(cordovaSQLiteDriver);
await storage.create();

export const store = configureStore({
    reducer: {
        [journalSlice.name]: journalSlice.reducer,
    },
});

store.subscribe(() => {
    storage.set("journalEntires", store.getState().journal.entires);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
