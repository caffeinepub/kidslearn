import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { KidsProfile, ParentalControls, GameType } from '../backend';
import { Principal } from '@dfinity/principal';

// ─── Kids Profile Hooks ───────────────────────────────────────────────────────

export function useGetKidsProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<KidsProfile | null>({
    queryKey: ['kidsProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getKidsProfile();
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

export function useCreateKidsProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: KidsProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createKidsProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kidsProfile'] });
    },
  });
}

export function useUpdateKidsProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: KidsProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateKidsProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kidsProfile'] });
    },
  });
}

export function useVerifyKidsPin() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (pin: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.verifyKidsPin(pin);
    },
  });
}

export function useUpdateKidsPin() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPin: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateKidsPin(newPin);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kidsProfile'] });
    },
  });
}

// ─── Parental Controls Hooks ──────────────────────────────────────────────────

export function useGetParentalControls() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<ParentalControls | null>({
    queryKey: ['parentalControls'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getParentalControls();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

export function useSetParentalControls() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settings: ParentalControls) => {
      if (!actor) throw new Error('Actor not available');
      return actor.setParentalControls(settings);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parentalControls'] });
    },
  });
}

// ─── Display Name Hooks ───────────────────────────────────────────────────────

export function useGetDisplayName() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<string | null>({
    queryKey: ['displayName'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getDisplayName();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useSetDisplayName() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.setDisplayName(name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['displayName'] });
    },
  });
}

// ─── Progress Hooks ───────────────────────────────────────────────────────────

/**
 * Fetches session progress for a given principal.
 * If no principal is provided, uses the currently authenticated user's principal.
 */
export function useGetSessionProgress(targetPrincipal?: Principal | null) {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  const principal = targetPrincipal !== undefined ? targetPrincipal : (identity?.getPrincipal() ?? null);

  return useQuery({
    queryKey: ['sessionProgress', principal?.toString()],
    queryFn: async () => {
      if (!actor || !principal) throw new Error('Actor or principal not available');
      return actor.getSessionProgress(principal);
    },
    enabled: !!actor && !actorFetching && !!principal,
  });
}

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

export function useAwardBadge() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ targetPrincipal, badgeId }: { targetPrincipal: Principal; badgeId: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.awardBadge(targetPrincipal, badgeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessionProgress'] });
    },
  });
}

// ─── Content Hooks ────────────────────────────────────────────────────────────

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

// ─── Game Session Hooks ───────────────────────────────────────────────────────

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

export function useGetUserGameSessions(userId: Principal | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery({
    queryKey: ['gameSessions', userId?.toString()],
    queryFn: async () => {
      if (!actor || !userId) throw new Error('Actor or userId not available');
      return actor.getUserGameSessions(userId);
    },
    enabled: !!actor && !actorFetching && !!userId,
  });
}

export function useGetUserGameStatistics(userId: Principal | null, gameType: GameType | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery({
    queryKey: ['gameStatistics', userId?.toString(), gameType],
    queryFn: async () => {
      if (!actor || !userId || !gameType) throw new Error('Actor, userId, or gameType not available');
      return actor.getUserGameStatistics(userId, gameType);
    },
    enabled: !!actor && !actorFetching && !!userId && !!gameType,
  });
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
        const { GameType } = await import('../backend');
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
