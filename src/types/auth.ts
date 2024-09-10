export type AuthState = {
    token: string | null;
};

export type User = {
    id: number;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    age: number;
    sex: boolean;
    createdAt: string;
    updatedAt: string;
};
