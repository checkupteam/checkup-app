import { api } from '.';
import { User } from '../types/auth';

const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<
            {
                access_token: string;
            },
            {
                email: string;
                pass: string;
            }
        >({
            query: (body) => ({
                url: '/auth/loginin',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Auth'],
        }),
        singup: build.mutation<
            void,
            {
                name: string;
                surname: string;
                email: string;
                hash: string;
                sex: boolean;
            }
        >({
            query: (body) => ({
                url: '/auth/signup',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Auth'],
        }),
        getUser: build.query<User, void>({
            query: () => '/user/info',
            providesTags: ['Auth'],
        }),
    }),
    overrideExisting: false,
});

export const { useLoginMutation, useSingupMutation, useGetUserQuery } = authApi;
