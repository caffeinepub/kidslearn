import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import type React from "react";
import { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

import AgeGroupSelection from "./pages/AgeGroupSelection";
import AlphabetLesson from "./pages/AlphabetLesson";
import CalendarLesson from "./pages/CalendarLesson";
import Donation from "./pages/Donation";
import Flashcards from "./pages/Flashcards";
// Pages
import Home from "./pages/Home";
import KidsDashboard from "./pages/KidsDashboard";
import Lessons from "./pages/Lessons";
import MatchingGame from "./pages/MatchingGame";
import MiniGame from "./pages/MiniGame";
import Numbers100Lesson from "./pages/Numbers100Lesson";
import NumbersLesson from "./pages/NumbersLesson";
import PictureLesson from "./pages/PictureLesson";
import PoemsLesson from "./pages/PoemsLesson";
import PostLoginProfile from "./pages/PostLoginProfile";
import Profile from "./pages/Profile";
import Progress from "./pages/Progress";
import PuzzleGame from "./pages/PuzzleGame";
import Quiz from "./pages/Quiz";
import SubjectSelection from "./pages/SubjectSelection";
import TimedChallenge from "./pages/TimedChallenge";
import VocabularyLesson from "./pages/VocabularyLesson";

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

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const postLoginProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/post-login-profile",
  component: PostLoginProfile,
});
const kidsDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/kids-dashboard",
  component: KidsDashboard,
});
const alphabetRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/alphabet",
  component: AlphabetLesson,
});
const numbersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/numbers",
  component: NumbersLesson,
});
const numbers100Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/numbers-100",
  component: Numbers100Lesson,
});
const vocabularyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vocabulary",
  component: VocabularyLesson,
});
const poemsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/poems",
  component: PoemsLesson,
});
const pictureLearningRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/picture-learning",
  component: PictureLesson,
});
const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quiz",
  component: Quiz,
});
const matchingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/matching",
  component: MatchingGame,
});
const matchingGameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/matching-game",
  component: MatchingGame,
});
const puzzleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/puzzle",
  component: PuzzleGame,
});
const timedChallengeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/timed-challenge",
  component: TimedChallenge,
});
const progressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/progress",
  component: Progress,
});
const donationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/donate",
  component: Donation,
});
const ageGroupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/age-group",
  component: AgeGroupSelection,
});
const subjectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/subjects",
  component: SubjectSelection,
});
const lessonsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/lessons",
  component: Lessons,
});
const flashcardsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/flashcards",
  component: Flashcards,
});
const miniGameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/mini-game",
  component: MiniGame,
});
const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: Profile,
});
const calendarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calendar",
  component: CalendarLesson,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  postLoginProfileRoute,
  kidsDashboardRoute,
  alphabetRoute,
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
  calendarRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
