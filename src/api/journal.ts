import { api } from '.';
import { JournalEntry } from '../types/journal';

const journalApi = api.injectEndpoints({
    endpoints: (build) => ({
        getJournalEntries: build.query<
            JournalEntry[],
            {
                year: number;
                month: number;
                day?: number;
            }
        >({
            query: (args) => ({
                url: `/journal/entries`,
                params: {
                    day: args.day && args.day.toString().padStart(2, '0'),
                    month: args.month.toString().padStart(2, '0'),
                    year: args.year,
                },
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: 'JournalEntry' as const,
                              id,
                          })),
                          'JournalEntry',
                      ]
                    : ['JournalEntry'],
        }),
        getJournalEntry: build.query<JournalEntry, number>({
            query: (id) => `/journal/entry/${id}`,
            providesTags: (result, error, id) =>
                result ? [{ type: 'JournalEntry', id }] : [],
        }),
        createJournalEntry: build.mutation<
            JournalEntry,
            {
                title: string;
                mood: number;
                isFavorite: boolean;
                text: string;
            }
        >({
            query: (body) => ({
                url: `/journal/entry`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['JournalEntry'],
        }),
        updateJournalEntry: build.mutation<
            JournalEntry,
            { id: number; changes: Partial<JournalEntry> }
        >({
            query: ({ id, changes }) => ({
                url: `/journal/update/${id}`,
                method: 'PATCH',
                body: changes,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'JournalEntry', id },
            ],
        }),
        deleteJournalEntry: build.mutation<void, number>({
            query: (id) => ({
                url: `/journal/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => ['JournalEntry'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetJournalEntriesQuery,
    useGetJournalEntryQuery,
    useCreateJournalEntryMutation,
    useUpdateJournalEntryMutation,
    useDeleteJournalEntryMutation,
} = journalApi;
