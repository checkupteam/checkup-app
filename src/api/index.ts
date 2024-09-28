import {
    createApi,
    fetchBaseQuery,
    TagTypesFromApi,
} from '@reduxjs/toolkit/query/react';
import { setToken } from '../store/auth';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as any).auth.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
})

const baseQueryWithAuth = async (args: any, api: any, extraOptions: any) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 403 || result?.error?.status === 401) {
        api.dispatch(setToken(null));
    }

    return result;
}

export const api = createApi({
    baseQuery: baseQueryWithAuth,
    tagTypes: ['JournalEntry', 'Task', 'Goal', 'Auth'],
    endpoints: () => ({}),
});

export const tagProvider = <T>(
    tagName: TagTypesFromApi<typeof api>,
    callbackFn: (value: T, index: number, array: T[]) => any,
) => {
    return (result: T[]) =>
        result ? [...result.map(callbackFn), tagName] : [tagName];
};
