import React from 'react';
import {
  createRouter,
  createRoute,
  createRootRoute,
  RouterProvider,
  Outlet,
} from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import KidsDashboard from './pages/KidsDashboard';
import PostLoginProfile from './pages/PostLoginProfile';
import AlphabetLesson from './pages/AlphabetLesson';
import AlphabetFullScreen from './pages/AlphabetFullScreen';
import NumbersLesson from './pages/NumbersLesson';
import Numbers100Lesson from './pages/Numbers100Lesson';
import VocabularyLesson from './pages/VocabularyLesson';
import PoemsLesson from './pages/PoemsLesson';
import PictureLesson from './pages/PictureLesson';
import Quiz from './pages/Quiz';
import MatchingGame from './pages/MatchingGame';
import PuzzleGame from './pages/PuzzleGame';
import TimedChallenge from './pages/TimedChallenge';
import Progress from './pages/Progress';
import Donation from './pages/Donation';
import AgeGroupSelection from './pages/AgeGroupSelection';
import SubjectSelection from './pages/SubjectSelection';
import Lessons from './pages/Lessons';
import Flashcards from './pages/Flashcards';
import MiniGame from './pages/MiniGame';
import Profile from './pages/Profile';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

// Layout component
const Layout: React.FC = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

// Routes
const rootRoute = createRootRoute({ component: Layout });

const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: Home });
const postLoginProfileRoute = createRoute({ getParentRoute: () => rootRoute, path: '/post-login-profile', component: PostLoginProfile });
const kidsDashboardRoute = createRoute({ getParentRoute: () => rootRoute, path: '/kids-dashboard', component: KidsDashboard });
const alphabetRoute = createRoute({ getParentRoute: () => rootRoute, path: '/alphabet', component: AlphabetLesson });
const alphabetFullScreenRoute = createRoute({ getParentRoute: () => rootRoute, path: '/alphabet-fullscreen', component: AlphabetFullScreen });
const numbersRoute = createRoute({ getParentRoute: () => rootRoute, path: '/numbers', component: NumbersLesson });
const numbers100Route = createRoute({ getParentRoute: () => rootRoute, path: '/numbers-100', component: Numbers100Lesson });
const vocabularyRoute = createRoute({ getParentRoute: () => rootRoute, path: '/vocabulary', component: VocabularyLesson });
const poemsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/poems', component: PoemsLesson });
const pictureLearningRoute = createRoute({ getParentRoute: () => rootRoute, path: '/picture-learning', component: PictureLesson });
const quizRoute = createRoute({ getParentRoute: () => rootRoute, path: '/quiz', component: Quiz });
const matchingRoute = createRoute({ getParentRoute: () => rootRoute, path: '/matching', component: MatchingGame });
const matchingGameRoute = createRoute({ getParentRoute: () => rootRoute, path: '/matching-game', component: MatchingGame });
const puzzleRoute = createRoute({ getParentRoute: () => rootRoute, path: '/puzzle', component: PuzzleGame });
const timedChallengeRoute = createRoute({ getParentRoute: () => rootRoute, path: '/timed-challenge', component: TimedChallenge });
const progressRoute = createRoute({ getParentRoute: () => rootRoute, path: '/progress', component: Progress });
const donationRoute = createRoute({ getParentRoute: () => rootRoute, path: '/donate', component: Donation });
const ageGroupRoute = createRoute({ getParentRoute: () => rootRoute, path: '/age-group', component: AgeGroupSelection });
const subjectsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/subjects', component: SubjectSelection });
const lessonsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/lessons', component: Lessons });
const flashcardsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/flashcards', component: Flashcards });
const miniGameRoute = createRoute({ getParentRoute: () => rootRoute, path: '/mini-game', component: MiniGame });
const profileRoute = createRoute({ getParentRoute: () => rootRoute, path: '/profile', component: Profile });

const routeTree = rootRoute.addChildren([
  indexRoute,
  postLoginProfileRoute,
  kidsDashboardRoute,
  alphabetRoute,
  alphabetFullScreenRoute,
  numbersRoute,
  numbers100Route,
  vocabularyRoute,
  poemsRoute,
  pictureLearningRoute,
  quizRoute,
  matchingRoute,
  matchingGameRoute,
  puzzleRoute,
  timedChallengeRoute,
  progressRoute,
  donationRoute,
  ageGroupRoute,
  subjectsRoute,
  lessonsRoute,
  flashcardsRoute,
  miniGameRoute,
  profileRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);

export default App;
