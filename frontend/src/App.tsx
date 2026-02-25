import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
  Outlet,
  Link,
} from '@tanstack/react-router';
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
import NumbersLesson from './pages/NumbersLesson';
import AlphabetLesson from './pages/AlphabetLesson';
import PoemsLesson from './pages/PoemsLesson';
import VocabularyLesson from './pages/VocabularyLesson';
import IndiaMap from './pages/IndiaMap';
import MatchingGame from './pages/MatchingGame';
import PuzzleGame from './pages/PuzzleGame';
import TimedChallenge from './pages/TimedChallenge';
import ParentDashboard from './pages/ParentDashboard';
import Donation from './pages/Donation';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

function Layout() {
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

const rootRoute = createRootRoute({ component: Layout });

const homeRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: Home });
const ageGroupRoute = createRoute({ getParentRoute: () => rootRoute, path: '/age-group', component: AgeGroupSelection });
const subjectRoute = createRoute({ getParentRoute: () => rootRoute, path: '/subjects', component: SubjectSelection });
const lessonsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/lessons', component: Lessons });
const flashcardsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/flashcards', component: Flashcards });
const quizRoute = createRoute({ getParentRoute: () => rootRoute, path: '/quiz', component: Quiz });
const miniGameRoute = createRoute({ getParentRoute: () => rootRoute, path: '/mini-game', component: MiniGame });
const progressRoute = createRoute({ getParentRoute: () => rootRoute, path: '/progress', component: Progress });
const numbersRoute = createRoute({ getParentRoute: () => rootRoute, path: '/numbers', component: NumbersLesson });
const alphabetRoute = createRoute({ getParentRoute: () => rootRoute, path: '/alphabet', component: AlphabetLesson });
const poemsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/poems', component: PoemsLesson });
const vocabularyRoute = createRoute({ getParentRoute: () => rootRoute, path: '/vocabulary', component: VocabularyLesson });
const mapRoute = createRoute({ getParentRoute: () => rootRoute, path: '/map', component: IndiaMap });
const matchingGameRoute = createRoute({ getParentRoute: () => rootRoute, path: '/matching-game', component: MatchingGame });
const puzzleRoute = createRoute({ getParentRoute: () => rootRoute, path: '/puzzle', component: PuzzleGame });
const timedChallengeRoute = createRoute({ getParentRoute: () => rootRoute, path: '/timed-challenge', component: TimedChallenge });
const parentDashboardRoute = createRoute({ getParentRoute: () => rootRoute, path: '/parent-dashboard', component: ParentDashboard });
const donationRoute = createRoute({ getParentRoute: () => rootRoute, path: '/donation', component: Donation });

const routeTree = rootRoute.addChildren([
  homeRoute,
  ageGroupRoute,
  subjectRoute,
  lessonsRoute,
  flashcardsRoute,
  quizRoute,
  miniGameRoute,
  progressRoute,
  numbersRoute,
  alphabetRoute,
  poemsRoute,
  vocabularyRoute,
  mapRoute,
  matchingGameRoute,
  puzzleRoute,
  timedChallengeRoute,
  parentDashboardRoute,
  donationRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
