import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { api } from "../api";
import CapacitorStorage from "redux-persist-capacitor";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel1";

const authPesistConfig = {
    key: "auth",
    storage: CapacitorStorage,
    stateReconciler: autoMergeLevel1,
};

const persistedAuthReducer = persistReducer<
    ReturnType<typeof authSlice.reducer>,
    any
>(authPesistConfig, authSlice.reducer);

export const store = configureStore({
    reducer: {
        [authSlice.name]: persistedAuthReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
