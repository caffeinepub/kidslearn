import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import { GameType, UserRole, SessionProgress } from '../backend';
import type { GameStatistics, GameSession } from '../backend';

// ─── Session Progress ─────────────────────────────────────────────────────────

export function useGetSessionProgress(targetPrincipal?: string) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['sessionProgress', targetPrincipal],
    queryFn: async () => {
      if (!actor || !targetPrincipal) return null;
      const { Principal } = await import('@dfinity/principal');
      return actor.getSessionProgress(Principal.fromText(targetPrincipal));
    },
    enabled: !!actor && !isFetching && !!targetPrincipal,
  });
}

// ─── Lessons ──────────────────────────────────────────────────────────────────

export function useGetLessons() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['lessons'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLessons();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Flashcards ───────────────────────────────────────────────────────────────

export function useGetFlashcards() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['flashcards'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFlashcards();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Quiz Questions ───────────────────────────────────────────────────────────

export function useGetQuizQuestions() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['quizQuestions'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getQuizQuestions();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Mini Game Content ────────────────────────────────────────────────────────

export function useGetMiniGameContent() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['miniGameContent'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMiniGameContent();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Complete Lesson ──────────────────────────────────────────────────────────

export function useCompleteLesson() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (lessonId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.completeLesson(lessonId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessionProgress'] });
    },
  });
}

// ─── Record Quiz Result ───────────────────────────────────────────────────────

export function useRecordQuizResult() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ subject, score, total }: { subject: string; score: bigint; total: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.recordQuizResult(subject, score, total);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessionProgress'] });
    },
  });
}

// ─── Award Badge ──────────────────────────────────────────────────────────────

export function useAwardBadge() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ targetPrincipal, badgeId }: { targetPrincipal: string; badgeId: string }) => {
      if (!actor) throw new Error('Actor not available');
      const { Principal } = await import('@dfinity/principal');
      return actor.awardBadge(Principal.fromText(targetPrincipal), badgeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessionProgress'] });
    },
  });
}

// ─── Game Sessions ────────────────────────────────────────────────────────────

export function useRecordGameSession() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      gameType,
      language,
      score,
      totalQuestions,
    }: {
      gameType: GameType;
      language: string;
      score: bigint;
      totalQuestions: bigint;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.recordGameSession(gameType, language, score, totalQuestions);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gameSessions'] });
      queryClient.invalidateQueries({ queryKey: ['gameStatistics'] });
    },
  });
}

export function useGetUserGameSessions(userId?: string) {
  const { actor, isFetching } = useActor();
  return useQuery<GameSession[]>({
    queryKey: ['gameSessions', userId],
    queryFn: async () => {
      if (!actor || !userId) return [];
      const { Principal } = await import('@dfinity/principal');
      return actor.getUserGameSessions(Principal.fromText(userId));
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

export function useGetUserGameStatistics(userId?: string, gameType?: GameType) {
  const { actor, isFetching } = useActor();
  return useQuery<GameStatistics | null>({
    queryKey: ['gameStatistics', userId, gameType],
    queryFn: async () => {
      if (!actor || !userId || gameType === undefined) return null;
      const { Principal } = await import('@dfinity/principal');
      return actor.getUserGameStatistics(Principal.fromText(userId), gameType);
    },
    enabled: !!actor && !isFetching && !!userId && gameType !== undefined,
  });
}

// ─── Role Management ──────────────────────────────────────────────────────────

export function useGetCallerRole() {
  const { actor, isFetching: actorFetching } = useActor();
  const query = useQuery<UserRole | null>({
    queryKey: ['callerRole'],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getCallerRole();
      } catch {
        return null;
      }
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSetCallerRole() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (role: UserRole) => {
      if (!actor) throw new Error('Actor not available');
      return actor.setCallerRole(role);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['callerRole'] });
    },
  });
}

// ─── All Sessions Progress (Teacher) ─────────────────────────────────────────

export function useGetAllSessionsProgress() {
  const { actor, isFetching } = useActor();
  return useQuery<Array<[string, SessionProgress]>>({
    queryKey: ['allSessionsProgress'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSessionsProgress();
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

// ─── Caller User Profile ──────────────────────────────────────────────────────

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();
  const query = useQuery({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

// ─── Guest Session Storage Fallback ──────────────────────────────────────────

const GUEST_SESSIONS_KEY = 'kidslearn_game_sessions';

export interface GuestGameSession {
  gameType: string;
  language: string;
  score: number;
  totalQuestions: number;
  timestamp: number;
}

export function saveGuestGameSession(session: GuestGameSession) {
  try {
    const existing = getGuestGameSessions();
    existing.push(session);
    sessionStorage.setItem(GUEST_SESSIONS_KEY, JSON.stringify(existing));
  } catch {
    // ignore storage errors
  }
}

export function getGuestGameSessions(): GuestGameSession[] {
  try {
    const raw = sessionStorage.getItem(GUEST_SESSIONS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as GuestGameSession[];
  } catch {
    return [];
  }
}

export function getGuestGameStatistics(gameType: string): {
  bestScore: number;
  averageScore: number;
  totalSessions: number;
} | null {
  const sessions = getGuestGameSessions().filter((s) => s.gameType === gameType);
  if (sessions.length === 0) return null;
  const scores = sessions.map((s) =>
    s.totalQuestions > 0 ? Math.round((s.score / s.totalQuestions) * 100) : s.score
  );
  const best = Math.max(...scores);
  const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  return { bestScore: best, averageScore: avg, totalSessions: sessions.length };
}

// ─── Combined hook: backend if authenticated, sessionStorage if guest ─────────

export function useRecordGameSessionWithFallback() {
  const { identity } = useInternetIdentity();
  const recordMutation = useRecordGameSession();

  const record = async ({
    gameType,
    language,
    score,
    totalQuestions,
  }: {
    gameType: string;
    language: string;
    score: number;
    totalQuestions: number;
  }) => {
    if (identity) {
      try {
        const gtMap: Record<string, GameType> = {
          timedChallenge: GameType.timedChallenge,
          matchingGame: GameType.matchingGame,
          puzzle: GameType.puzzle,
          quiz: GameType.quiz,
        };
        await recordMutation.mutateAsync({
          gameType: gtMap[gameType] ?? GameType.quiz,
          language,
          score: BigInt(score),
          totalQuestions: BigInt(totalQuestions),
        });
      } catch {
        saveGuestGameSession({ gameType, language, score, totalQuestions, timestamp: Date.now() });
      }
    } else {
      saveGuestGameSession({ gameType, language, score, totalQuestions, timestamp: Date.now() });
    }
  };

  return { record, isLoading: recordMutation.isPending };
}
