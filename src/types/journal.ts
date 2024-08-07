export enum Moods {
    TERRIBLE = "terrible",
    BAD = "bad",
    OKAY = "okay",
    GOOD = "good",
    GREAT = "great",
}

export type JournalEntry = {
    title: string;
    content: string;
    date: Date;
    mood: Moods;
};

export interface JournalState {
    entires: JournalEntry[];
}
