import { useGetParentalControls } from './useQueries';

export function useContentRestrictions() {
  const { data: controls } = useGetParentalControls();

  const isSubjectAllowed = (subject: string): boolean => {
    if (!controls) return true;
    if (controls.contentRestrictions.length === 0) return true;
    return !controls.contentRestrictions.includes(subject.toLowerCase());
  };

  const isGameAllowed = (gameId: bigint): boolean => {
    if (!controls) return true;
    if (controls.gamesAllowed.length === 0) return true;
    return controls.gamesAllowed.some((id) => id === gameId);
  };

  return { isSubjectAllowed, isGameAllowed, controls };
}
