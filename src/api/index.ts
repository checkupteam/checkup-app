import {
    createApi,
    fetchBaseQuery,
    TagTypesFromApi,
} from '@reduxjs/toolkit/query/react';

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
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
