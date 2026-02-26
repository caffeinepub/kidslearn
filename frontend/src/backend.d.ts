import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface NumberCard {
    hindi: string;
    audioUrl: string;
    number: bigint;
    telugu: string;
    english: string;
}
export interface GameStatistics {
    bestScore: bigint;
    totalScore: bigint;
    totalSessions: bigint;
    averageScore: bigint;
}
export type Time = bigint;
export interface ParentalControls {
    gamesAllowed: Array<bigint>;
    contentRestrictions: Array<string>;
}
export interface LearningContentPackage {
    animalCards: Array<AnimalCard>;
    stateInfos: Array<StateInfo>;
    additionProblems: Array<AdditionProblem>;
    bodyParts: Array<BodyPart>;
    numberCards: Array<NumberCard>;
    plantCards: Array<PlantCard>;
}
export interface QuizQuestion {
    id: bigint;
    question: string;
    correctIndex: bigint;
    options: Array<string>;
}
export interface AnimalCard {
    nameHindi: string;
    nameTelugu: string;
    nameEnglish: string;
    audioUrl: string;
    imageUrl: string;
}
export interface QuizResult {
    total: bigint;
    subject: string;
    score: bigint;
}
export interface AdditionProblem {
    hindi: string;
    answer: bigint;
    firstNumber: bigint;
    telugu: string;
    secondNumber: bigint;
    english: string;
}
export interface SessionProgress {
    earnedBadges: Array<string>;
    completedLessons: Array<bigint>;
    quizResults: Array<QuizResult>;
}
export interface PlantCard {
    nameHindi: string;
    nameTelugu: string;
    nameEnglish: string;
    audioUrl: string;
    imageUrl: string;
}
export interface StateInfo {
    nameHindi: string;
    stateId: bigint;
    capitalEnglish: string;
    nameTelugu: string;
    nameEnglish: string;
    emoji: string;
    capitalHindi: string;
    capitalTelugu: string;
}
export interface KidsProfile {
    age: bigint;
    pin: string;
    name: string;
    avatar: string;
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
export interface BodyPart {
    nameHindi: string;
    nameTelugu: string;
    nameEnglish: string;
    audioUrl: string;
    imageUrl: string;
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
    email: string;
    avatarUrl: string;
}
export enum GameType {
    quiz = "quiz",
    matchingGame = "matchingGame",
    puzzle = "puzzle",
    timedChallenge = "timedChallenge"
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
    createKidsProfile(profile: KidsProfile): Promise<void>;
    getAllSessionsProgress(): Promise<Array<[string, SessionProgress]>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDisplayName(): Promise<string | null>;
    getFlashcards(): Promise<Array<Flashcard>>;
    getGameTypeAverage(gameType: GameType): Promise<{
        totalSessions: bigint;
        averageScore: bigint;
    } | null>;
    getKidsProfile(): Promise<KidsProfile | null>;
    getLearningContentPackage(): Promise<LearningContentPackage>;
    getLessons(): Promise<Array<Lesson>>;
    getMiniGameContent(): Promise<Array<MiniGameContent>>;
    getParentalControls(): Promise<ParentalControls | null>;
    getQuizQuestions(): Promise<Array<QuizQuestion>>;
    getSessionProgress(targetPrincipal: Principal): Promise<SessionProgress>;
    getUserGameSessions(userId: Principal): Promise<Array<GameSession>>;
    getUserGameStatistics(userId: Principal, gameType: GameType): Promise<GameStatistics | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    recordGameSession(gameType: GameType, language: string, score: bigint, totalQuestions: bigint): Promise<void>;
    recordQuizResult(subject: string, score: bigint, total: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setDisplayName(name: string): Promise<void>;
    setParentalControls(settings: ParentalControls): Promise<void>;
    setupContent(): Promise<void>;
    setupLearningContent(): Promise<void>;
    updateKidsPin(newPin: string): Promise<void>;
    updateKidsProfile(profile: KidsProfile): Promise<void>;
    verifyKidsPin(pin: string): Promise<boolean>;
}
