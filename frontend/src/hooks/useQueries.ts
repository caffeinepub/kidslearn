import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { Lesson, Flashcard, QuizQuestion, MiniGameContent, SessionProgress } from '../backend';

export function useGetLessons() {
  const { actor, isFetching } = useActor();
  return useQuery<Lesson[]>({
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
  return useQuery<Flashcard[]>({
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
  return useQuery<QuizQuestion[]>({
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
  return useQuery<MiniGameContent[]>({
    queryKey: ['miniGameContent'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMiniGameContent();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetSessionProgress() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<SessionProgress>({
    queryKey: ['sessionProgress', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) return { completedLessons: [], quizResults: [], earnedBadges: [] };
      const principal = identity.getPrincipal();
      return actor.getSessionProgress(principal);
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useCompleteLesson() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (lessonId: bigint) => {
      if (!actor || !identity) throw new Error('Not authenticated');
      await actor.completeLesson(lessonId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessionProgress'] });
    },
  });
}

export function useRecordQuizResult() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ subject, score, total }: { subject: string; score: bigint; total: bigint }) => {
      if (!actor || !identity) throw new Error('Not authenticated');
      await actor.recordQuizResult(subject, score, total);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessionProgress'] });
    },
  });
}

export function useAwardBadge() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (badgeId: string) => {
      if (!actor || !identity) throw new Error('Not authenticated');
      // awardBadge is admin-only on the backend; we call it optimistically and ignore auth errors
      const principal = identity.getPrincipal();
      await actor.awardBadge(principal, badgeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessionProgress'] });
    },
  });
}

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  const query = useQuery({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching && !!identity,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}
