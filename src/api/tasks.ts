import { api } from ".";
import { TaskEntry } from "../types/tasks";

const TaskApi = api.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<
            TaskEntry[],
            {
                limit?: number;
                order?: "asc" | "desc";
                userId: number,
                isDone?: boolean,
            }
        >({
            query: (args) => ({
                url: `/tasks`,
                params: {
                    limit: args.limit,
                    order: args.order,
                    userId: args.userId,
                    isDone: args.isDone,
                },
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: "Task" as const,
                              id,
                          })),
                          "Task",
                      ]
                    : ["Task"],
        }),
        getTask: build.query<TaskEntry, number>({
            query: (id) => `/task${id}`,
            providesTags: (result, error, id) => (result ? [{ type: "Task", id }] : []),
        }),
        createTask: build.mutation<
            TaskEntry,
            {
                title: string;
                isDone: boolean;
                text: string;
            }
        >({
            query: (body) => ({
                url: `/task/create`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Task"],
        }),
        updateTask: build.mutation<TaskEntry, { id: number; changes: Partial<TaskEntry> }>({
            query: ({ id, changes }) => ({
                url: `/task/update/${id}`,
                method: "PATCH",
                body: changes,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Task", id }],
        }),
        deleteTask: build.mutation<void, number>({
            query: (id) => ({
                url: `/task/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => ["Task"],
        }),
    }),
    overrideExisting: false,
});

export const { useGetTasksQuery, useGetTaskQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = TaskApi;
