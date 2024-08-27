import { api } from ".";
import { TaskEntry } from "../types/tasks";

const TaskApi = api.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<
            { docs: TaskEntry[] },
            {
                page: number;
                limit: number;
                orderBy: "asc" | "desc";
                isDone?: boolean;
            }
        >({
            query: (args) => ({
                url: `/taskManager/tasks`,
                params: args,
            }),
            providesTags: (result) =>
                result?.docs
                    ? [
                          ...result.docs.map(({ id }) => ({
                              type: "Task" as const,
                              id,
                          })),
                          "Task",
                      ]
                    : ["Task"],
        }),
        getTask: build.query<TaskEntry, number>({
            query: (id) => `/task${id}`,
            providesTags: (result, error, id) =>
                result ? [{ type: "Task", id }] : [],
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
                url: `/taskManager/task`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Task"],
        }),
        updateTask: build.mutation<
            TaskEntry,
            { id: number; changes: Partial<TaskEntry> }
        >({
            query: ({ id, changes }) => ({
                url: `/taskManager/task/${id}`,
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

export const {
    useGetTasksQuery,
    useGetTaskQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} = TaskApi;
