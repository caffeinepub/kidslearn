import React, { useEffect } from 'react';
import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet, redirect } from '@tanstack/react-router';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { usePinLock } from './hooks/usePinLock';
import { useGetKidsProfile } from './hooks/useQueries';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Home from './pages/Home';
import AgeGroupSelection from './pages/AgeGroupSelection';
import SubjectSelection from './pages/SubjectSelection';
import Lessons from './pages/Lessons';
import Flashcards from './pages/Flashcards';
import Quiz from './pages/Quiz';
import MiniGame from './pages/MiniGame';
import Progress from './pages/Progress';
import MatchingGame from './pages/MatchingGame';
import PuzzleGame from './pages/PuzzleGame';
import TimedChallenge from './pages/TimedChallenge';
import AlphabetLesson from './pages/AlphabetLesson';
import AlphabetFullScreen from './pages/AlphabetFullScreen';
import PoemsLesson from './pages/PoemsLesson';
import NumbersLesson from './pages/NumbersLesson';
import Numbers100Lesson from './pages/Numbers100Lesson';
import VocabularyLesson from './pages/VocabularyLesson';
import PictureLesson from './pages/PictureLesson';
import Donation from './pages/Donation';
import Profile from './pages/Profile';
import ProfileSetup from './pages/ProfileSetup';
import PinEntry from './pages/PinEntry';
import ParentalControls from './pages/ParentalControls';

// Layout component with auth guard
function RootLayout() {
  const { identity } = useInternetIdentity();
  const { isPinUnlocked } = usePinLock();
  const { data: kidsProfile, isLoading: profileLoading, isFetched } = useGetKidsProfile();

  const isAuthenticated = !!identity;

  // We handle redirects in the layout so all child routes benefit
  useEffect(() => {
    if (!isAuthenticated) return;
    if (profileLoading || !isFetched) return;

    const currentPath = window.location.pathname;
    const isSetupPage = currentPath === '/profile-setup';
    const isPinPage = currentPath === '/pin-entry';
    const isParentalPage = currentPath === '/parental-controls';

    if (kidsProfile === null && !isSetupPage) {
      window.location.href = '/profile-setup';
      return;
    }

    if (kidsProfile !== null && !isPinUnlocked && !isPinPage && !isSetupPage && !isParentalPage) {
      window.location.href = '/pin-entry';
    }
  }, [isAuthenticated, kidsProfile, isPinUnlocked, profileLoading, isFetched]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const profileSetupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile-setup',
  component: ProfileSetup,
});

const pinEntryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pin-entry',
  component: PinEntry,
});

const parentalControlsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/parental-controls',
  component: ParentalControls,
});

const ageGroupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/age-group',
  component: AgeGroupSelection,
});

const subjectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/subjects/$ageGroup',
  component: SubjectSelection,
});

const lessonsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/lessons/$subject',
  component: Lessons,
});

const flashcardsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/flashcards/$subject',
  component: Flashcards,
});

const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/quiz/$subject',
  component: Quiz,
});

const miniGameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/mini-game/$subject',
  component: MiniGame,
});

const progressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/progress',
  component: Progress,
});

const matchingGameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/matching-game/$language',
  component: MatchingGame,
});

const puzzleGameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/puzzle-game/$language',
  component: PuzzleGame,
});

const timedChallengeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/timed-challenge',
  component: TimedChallenge,
});

const alphabetLessonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/alphabet-lesson/$language',
  component: AlphabetLesson,
});

const alphabetFullScreenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/alphabet-fullscreen/$language',
  component: AlphabetFullScreen,
});

const poemsLessonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/poems-lesson/$language',
  component: PoemsLesson,
});

const numbersLessonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/numbers-lesson/$language',
  component: NumbersLesson,
});

const numbers100LessonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/numbers-100/$language',
  component: Numbers100Lesson,
});

const vocabularyLessonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/vocabulary-lesson/$language',
  component: VocabularyLesson,
});

const pictureLessonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/picture-lesson/$language',
  component: PictureLesson,
});

const donationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/donate',
  component: Donation,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: Profile,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  profileSetupRoute,
  pinEntryRoute,
  parentalControlsRoute,
  ageGroupRoute,
  subjectRoute,
  lessonsRoute,
  flashcardsRoute,
  quizRoute,
  miniGameRoute,
  progressRoute,
  matchingGameRoute,
  puzzleGameRoute,
  timedChallengeRoute,
  alphabetLessonRoute,
  alphabetFullScreenRoute,
  poemsLessonRoute,
  numbersLessonRoute,
  numbers100LessonRoute,
  vocabularyLessonRoute,
  pictureLessonRoute,
  donationRoute,
  profileRoute,
]);

const router = createRouter({ routeTree });

export default function App() {
  return <RouterProvider router={router} />;
}
