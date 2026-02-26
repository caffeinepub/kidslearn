import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface GameStatistics {
    bestScore: bigint;
    totalScore: bigint;
    totalSessions: bigint;
    averageScore: bigint;
}
export type Time = bigint;
export interface QuizQuestion {
    id: bigint;
    question: string;
    correctIndex: bigint;
    options: Array<string>;
}
export interface Task {
    id: bigint;
    title: string;
    isCompleted: boolean;
    description: string;
    points: bigint;
}
export interface QuizResult {
    total: bigint;
    subject: string;
    score: bigint;
}
export interface SessionProgress {
    earnedBadges: Array<string>;
    completedLessons: Array<bigint>;
    quizResults: Array<QuizResult>;
}
export interface TaskUpdate {
    title: string;
    description: string;
    points: bigint;
}
export interface TaskInput {
    title: string;
    description: string;
    points: bigint;
}
export interface Lesson {
    id: bigint;
    title: string;
    body: string;
    image: string;
}
export interface Flashcard {
    id: bigint;
    front: string;
    back: string;
    image: string;
}
export interface MiniGameContent {
    id: bigint;
    pairs: Array<[string, string]>;
}
export interface GameSession {
    userId: Principal;
    score: bigint;
    language: string;
    totalQuestions: bigint;
    timestamp: Time;
    gameType: GameType;
}
export interface UserProfile {
    name: string;
    role: UserRole;
    avatarId: string;
}
export enum GameType {
    quiz = "quiz",
    matchingGame = "matchingGame",
    puzzle = "puzzle",
    timedChallenge = "timedChallenge"
}
export enum UserRole {
    student = "student",
    parent = "parent"
}
export enum UserRole__1 {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole__1): Promise<void>;
    awardBadge(targetPrincipal: Principal, badgeId: string): Promise<void>;
    completeLesson(lessonId: bigint): Promise<void>;
    createTask(taskInput: TaskInput): Promise<Task>;
    getAllSessionsProgress(): Promise<Array<[string, SessionProgress]>>;
    getCallerRole(): Promise<UserRole>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole__1>;
    getDisplayName(user: Principal): Promise<string | null>;
    getFlashcards(): Promise<Array<Flashcard>>;
    getGameTypeAverage(gameType: GameType): Promise<{
        totalSessions: bigint;
        averageScore: bigint;
    } | null>;
    getLessons(): Promise<Array<Lesson>>;
    getMiniGameContent(): Promise<Array<MiniGameContent>>;
    getQuizQuestions(): Promise<Array<QuizQuestion>>;
    getSessionProgress(targetPrincipal: Principal): Promise<SessionProgress>;
    getTasks(): Promise<Array<Task>>;
    getUserGameSessions(userId: Principal): Promise<Array<GameSession>>;
    getUserGameStatistics(userId: Principal, gameType: GameType): Promise<GameStatistics | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getUserRole(user: Principal): Promise<UserRole>;
    isCallerAdmin(): Promise<boolean>;
    markTaskComplete(id: bigint): Promise<Task | null>;
    recordGameSession(gameType: GameType, language: string, score: bigint, totalQuestions: bigint): Promise<void>;
    recordQuizResult(subject: string, score: bigint, total: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setCallerRole(role: UserRole): Promise<void>;
    setDisplayName(name: string): Promise<void>;
    setupContent(): Promise<void>;
    updateTask(id: bigint, taskUpdate: TaskUpdate): Promise<Task | null>;
}
