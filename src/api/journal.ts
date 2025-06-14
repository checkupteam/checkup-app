import { api } from '.';
import { JournalAnswer, JournalEntry } from '../types/journal';

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
                answers: { answer: string }[];
            }
        >({
            query: (body) => ({
                url: `/journal/fullEntry`,
                method: 'POST',
                body: {
                    ...body,
                    mood: parseInt(body.mood as any),
                },
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
        updateJournalAnswer: build.mutation<
            JournalAnswer,
            { id: number; answer: string }
        >({
            query: ({ id, answer }) => ({
                url: `/journal/answer/${id}`,
                method: 'PATCH',
                body: { answer },
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'JournalEntry', id: result?.journalId },
            ],
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
    useUpdateJournalAnswerMutation,
} = journalApi;
