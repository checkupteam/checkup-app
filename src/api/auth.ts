import { api } from ".";

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
                url: "/auth/loginin",
                method: "POST",
                body,
            }),
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
                url: "/auth/signup",
                method: "POST",
                body,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useLoginMutation, useSingupMutation } = authApi;
