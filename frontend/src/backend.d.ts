import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Lesson {
    id: bigint;
    title: string;
    body: string;
    image: string;
}
export interface QuizQuestion {
    id: bigint;
    question: string;
    correctIndex: bigint;
    options: Array<string>;
}
export interface MiniGameContent {
    id: bigint;
    pairs: Array<[string, string]>;
}
export interface QuizResult {
    total: bigint;
    subject: string;
    score: bigint;
}
export interface Flashcard {
    id: bigint;
    front: string;
    back: string;
    image: string;
}
export interface SessionProgress {
    earnedBadges: Array<string>;
    completedLessons: Array<bigint>;
    quizResults: Array<QuizResult>;
}
export interface UserProfile {
    name: string;
    role: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    awardBadge(targetPrincipal: Principal, badgeId: string): Promise<void>;
    completeLesson(lessonId: bigint): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFlashcards(): Promise<Array<Flashcard>>;
    getLessons(): Promise<Array<Lesson>>;
    getMiniGameContent(): Promise<Array<MiniGameContent>>;
    getQuizQuestions(): Promise<Array<QuizQuestion>>;
    getSessionProgress(targetPrincipal: Principal): Promise<SessionProgress>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    recordQuizResult(subject: string, score: bigint, total: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setupContent(): Promise<void>;
}
