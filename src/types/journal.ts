export enum Moods {
    TERRIBLE = 1,
    BAD = 2,
    OKAY = 3,
    GOOD = 4,
    GREAT = 5,
}

export type JournalEntry = {
    id: number;
    createdAt: string;
    updatedAt: string;
    title: string;
    mood: Moods;
    isFavorite: boolean;
    text: string;
    createdDate: number;
    Answer: { answer: string }[];
};
