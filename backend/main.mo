import List "mo:core/List";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import Storage "blob-storage/Storage";

actor {
  // Access control state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // User Profile Type (required by frontend)
  public type UserProfile = {
    name : Text;
    role : Text; // "parent", "teacher", "child"
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // Persistent Types
  type Lesson = {
    id : Nat;
    title : Text;
    body : Text;
    image : Text;
  };

  type Flashcard = {
    id : Nat;
    front : Text;
    back : Text;
    image : Text;
  };

  type QuizQuestion = {
    id : Nat;
    question : Text;
    options : [Text];
    correctIndex : Nat;
  };

  type MiniGameContent = {
    id : Nat;
    pairs : [(Text, Text)];
  };

  type QuizResult = {
    subject : Text;
    score : Nat;
    total : Nat;
  };

  type SessionProgress = {
    completedLessons : [Nat];
    quizResults : [QuizResult];
    earnedBadges : [Text];
  };

  // Internal Persistent Types
  type InternalQuizResult = QuizResult;
  type InternalSessionProgress = {
    completedLessons : List.List<Nat>;
    quizResults : List.List<InternalQuizResult>;
    earnedBadges : List.List<Text>;
  };

  // Persistent Store
  let lessons : List.List<Lesson> = List.empty<Lesson>();
  let flashcards : List.List<Flashcard> = List.empty<Flashcard>();
  let quizQuestions : List.List<QuizQuestion> = List.empty<QuizQuestion>();
  let miniGameContents : List.List<MiniGameContent> = List.empty<MiniGameContent>();
  // sessionProgress keyed by Principal text so only the owner can access their data
  let sessionProgress = Map.empty<Text, InternalSessionProgress>();

  // Helper Sort Functions
  module LessonSort {
    public func compare(l1 : Lesson, l2 : Lesson) : Order.Order {
      Nat.compare(l1.id, l2.id);
    };
  };

  // User Profile Functions (required by frontend)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can get their profile");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    // Admins can view any profile; users can only view their own
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can save their profile");
    };
    userProfiles.add(caller, profile);
  };

  // Admin: Content Setup
  // Only admins may seed/reset content
  public shared ({ caller }) func setupContent() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can set up content");
    };

    // Add sample lessons
    let lessonItems = [
      { id = 1; title = "Counting to 10"; body = "Learn to count from 1 to 10."; image = "counting.png" },
      {
        id = 2;
        title = "Alphabet Basics";
        body = "Introduction to the ABCs.";
        image = "alphabet.png";
      },
    ];
    for (lesson in lessonItems.values()) {
      lessons.add(lesson);
    };

    // Add sample flashcards
    let flashcardItems = [
      {
        id = 1;
        front = "Apple";
        back = "A fruit that is red or green.";
        image = "apple.png";
      },
      { id = 2; front = "Dog"; back = "Barks and wags its tail."; image = "dog.png" },
    ];
    for (flashcard in flashcardItems.values()) {
      flashcards.add(flashcard);
    };

    // Add sample quiz questions
    let quizItems = [
      {
        id = 1;
        question = "What is 2 + 2?";
        options = ["3", "4", "5", "6"];
        correctIndex = 1;
      },
      {
        id = 2;
        question = "What letter comes after A?";
        options = ["B", "C", "D", "E"];
        correctIndex = 0;
      },
    ];
    for (quiz in quizItems.values()) {
      quizQuestions.add(quiz);
    };

    // Add sample mini-game content
    let miniGameItems = [{ id = 1; pairs = [("🐶", "Dog"), ("🍎", "Apple")] }];
    for (miniGame in miniGameItems.values()) {
      miniGameContents.add(miniGame);
    };
  };

  // Content Query Functions (public – guests may read learning content)
  public query func getLessons() : async [Lesson] {
    lessons.toArray().sort();
  };

  public query func getFlashcards() : async [Flashcard] {
    flashcards.toArray();
  };

  public query func getQuizQuestions() : async [QuizQuestion] {
    quizQuestions.toArray();
  };

  public query func getMiniGameContent() : async [MiniGameContent] {
    miniGameContents.toArray();
  };

  // Progress Tracking (authenticated users only)
  // completeLesson: any authenticated user may record their own lesson completion.
  // The session key is derived from the caller's principal so users cannot
  // tamper with each other's progress.
  public shared ({ caller }) func completeLesson(lessonId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can record lesson completion");
    };
    let sessionId = caller.toText();
    let progress = switch (sessionProgress.get(sessionId)) {
      case (null) {
        {
          completedLessons = List.empty<Nat>();
          quizResults = List.empty<InternalQuizResult>();
          earnedBadges = List.empty<Text>();
        };
      };
      case (?p) { p };
    };

    // Prevent adding the same lesson twice
    if (progress.completedLessons.any(func(id : Nat) : Bool { id == lessonId })) {
      Runtime.trap("Lesson already completed");
    };

    let newCompletedLessons = progress.completedLessons.clone();
    newCompletedLessons.add(lessonId);
    sessionProgress.add(sessionId, { progress with completedLessons = newCompletedLessons });
  };

  // recordQuizResult: authenticated users record their own quiz scores.
  public shared ({ caller }) func recordQuizResult(subject : Text, score : Nat, total : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can record quiz results");
    };
    let sessionId = caller.toText();
    let progress = switch (sessionProgress.get(sessionId)) {
      case (null) {
        {
          completedLessons = List.empty<Nat>();
          quizResults = List.empty<InternalQuizResult>();
          earnedBadges = List.empty<Text>();
        };
      };
      case (?p) { p };
    };

    let newQuizResults = progress.quizResults.clone();
    newQuizResults.add({ subject; score; total });
    sessionProgress.add(sessionId, { progress with quizResults = newQuizResults });
  };

  // awardBadge: admin-only – badges are awarded by the system, not self-claimed.
  public shared ({ caller }) func awardBadge(targetPrincipal : Principal, badgeId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can award badges");
    };
    let sessionId = targetPrincipal.toText();
    let progress = switch (sessionProgress.get(sessionId)) {
      case (null) {
        {
          completedLessons = List.empty<Nat>();
          quizResults = List.empty<InternalQuizResult>();
          earnedBadges = List.empty<Text>();
        };
      };
      case (?p) { p };
    };

    // Prevent duplicate badges
    if (progress.earnedBadges.any(func(b : Text) : Bool { b == badgeId })) {
      Runtime.trap("Badge already awarded");
    };

    let newEarnedBadges = progress.earnedBadges.clone();
    newEarnedBadges.add(badgeId);
    sessionProgress.add(sessionId, { progress with earnedBadges = newEarnedBadges });
  };

  // getSessionProgress: authenticated users can view their own progress;
  // admins can view any user's progress (parent/teacher dashboard).
  public query ({ caller }) func getSessionProgress(targetPrincipal : Principal) : async SessionProgress {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view progress");
    };
    // Non-admins may only view their own progress
    if (caller != targetPrincipal and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own progress");
    };
    let sessionId = targetPrincipal.toText();
    toPublicSessionProgress(
      switch (sessionProgress.get(sessionId)) {
        case (null) {
          {
            completedLessons = List.empty<Nat>();
            quizResults = List.empty<InternalQuizResult>();
            earnedBadges = List.empty<Text>();
          };
        };
        case (?progress) { progress };
      },
    );
  };

  // Helpers
  func toPublicSessionProgress(progress : InternalSessionProgress) : SessionProgress {
    {
      completedLessons = progress.completedLessons.toArray();
      quizResults = progress.quizResults.toArray();
      earnedBadges = progress.earnedBadges.toArray();
    };
  };
};
