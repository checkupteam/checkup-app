export type Goal = {
    id: number;
    title: string;
    isDone: boolean;
    createdAt: string;
    updatedAt: string;
};

export type Phase = {
    id: number;
    goalId: number;
    title: string;
    isDone: boolean;
    createdAt: string;
    updatedAt: string;
    Subpoint: Step[];
};

export type Step = {
    id: number;
    phaseId: number;
    title: string;
    description?: string;
    isDone: boolean;
    createdAt: string;
    updatedAt: string;
};
