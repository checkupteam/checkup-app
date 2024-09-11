import { api } from ".";

const homeApi = api.injectEndpoints({
    endpoints: (build) => ({
        getQuote: build.query<string, void>({
            query: () => "/home/quote",
        }),
    }),
});

export const { useGetQuoteQuery } = homeApi;
