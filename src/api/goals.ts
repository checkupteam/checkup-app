import { api } from ".";
import { Goal, Phase } from "../types/goals";

const goalsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getGoals: build.query<Goal[], void>({
            query: () => "/goalManager/goals",
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: "Goal" as const,
                              id,
                          })),
                          "Goal",
                      ]
                    : ["Goal"],
        }),
        getGoal: build.query<Goal & { Phase: Phase[] }, number>({
            query: (id) => `/goalManager/goal/${id}`,
            providesTags: (result) =>
                result ? [{ type: "Goal", id: result.id }] : [],
        }),
        createGoal: build.mutation<Goal, { title: string; isDone: boolean }>({
            query: (body) => ({
                url: "/goalManager/goal",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Goal"],
        }),
        updateGoal: build.mutation<
            Goal,
            { id: number; changes: { title?: string; isDone?: boolean } }
        >({
            query: ({ id, changes }) => ({
                url: `/goalManager/goal/${id}`,
                method: "PATCH",
                body: changes,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Goal", id }],
        }),
        deleteGoal: build.mutation<void, number>({
            query: (id) => ({
                url: `/goalManager/goal/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [{ type: "Goal", id }],
        }),
        createPhase: build.mutation<
            any,
            { goalId: number; title: string; isDone: boolean }
        >({
            query: ({ goalId, ...body }) => ({
                url: `/goalManager/phase/${goalId}`,
                method: "POST",
                body,
            }),
            invalidatesTags: (result, error, { goalId }) => [
                { type: "Goal", id: goalId },
            ],
        }),
        createStep: build.mutation<
            any,
            {
                phaseId: number;
                title: string;
                isDone: boolean;
                description?: string;
            }
        >({
            query: ({ phaseId, ...body }) => ({
                url: `/goalManager/subpoint/${phaseId}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Goal"],
        }),
        updateStep: build.mutation<
            any,
            {
                id: number;
                changes: {
                    title?: string;
                    isDone?: boolean;
                    description?: string;
                };
            }
        >({
            query: ({ id, changes }) => ({
                url: `/goalManager/subpoint/${id}`,
                method: "PATCH",
                body: changes,
            }),
            invalidatesTags: ["Goal"],
        }),
        deleteStep: build.mutation<void, number>({
            query: (id) => ({
                url: `/goalManager/subpoint/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Goal"],
        }),
        deletePhase: build.mutation<void, number>({
            query: (id) => ({
                url: `/goalManager/phase/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Goal"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetGoalsQuery,
    useGetGoalQuery,
    useCreateGoalMutation,
    useUpdateGoalMutation,
    useDeleteGoalMutation,
    useCreatePhaseMutation,
    useCreateStepMutation,
    useUpdateStepMutation,
    useDeleteStepMutation,
    useDeletePhaseMutation,
} = goalsApi;
