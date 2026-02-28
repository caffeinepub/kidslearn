import List "mo:core/List";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Array "mo:core/Array";

import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import Storage "blob-storage/Storage";



actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  public type UserRole = {
    #parent;
    #student;
  };

  public type UserProfile = {
    name : Text;
    role : UserRole;
    avatarId : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let userRoles = Map.empty<Principal, UserRole>();
  let displayNames = Map.empty<Principal, Text>();

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

  type GameType = {
    #timedChallenge;
    #matchingGame;
    #puzzle;
    #quiz;
  };

  module GameType {
    public func compare(g1 : GameType, g2 : GameType) : Order.Order {
      let toNat = func(g : GameType) : Nat {
        switch (g) {
          case (#timedChallenge) { 0 };
          case (#matchingGame) { 1 };
          case (#puzzle) { 2 };
          case (#quiz) { 3 };
        };
      };
      Nat.compare(toNat(g1), toNat(g2));
    };
  };

  type GameSession = {
    userId : Principal;
    gameType : GameType;
    language : Text;
    score : Nat;
    totalQuestions : Nat;
    timestamp : Time.Time;
  };

  type GameStatistics = {
    bestScore : Nat;
    totalSessions : Nat;
    totalScore : Nat;
    averageScore : Nat;
  };

  type InternalQuizResult = QuizResult;
  type InternalSessionProgress = {
    completedLessons : List.List<Nat>;
    quizResults : List.List<InternalQuizResult>;
    earnedBadges : List.List<Text>;
  };

  ///--- Tasks and Chores ---///
  public type Task = {
    id : Nat;
    title : Text;
    description : Text;
    points : Nat;
    isCompleted : Bool;
  };

  public type TaskInput = {
    title : Text;
    description : Text;
    points : Nat;
  };

  public type TaskUpdate = {
    title : Text;
    description : Text;
    points : Nat;
  };

  type InternalTask = Task;
  let tasks = Map.empty<Nat, InternalTask>();
  var nextTaskId = 1;

  let lessons : List.List<Lesson> = List.empty<Lesson>();
  let flashcards : List.List<Flashcard> = List.empty<Flashcard>();
  let quizQuestions : List.List<QuizQuestion> = List.empty<QuizQuestion>();
  let miniGameContents : List.List<MiniGameContent> = List.empty<MiniGameContent>();
  let sessionProgress = Map.empty<Text, InternalSessionProgress>();
  let gameSessions = List.empty<GameSession>();

  let emptyGameStatsMap = Map.empty<GameType, GameStatistics>();
  let perUserGameStats = Map.empty<Principal, Map.Map<GameType, GameStatistics>>();

  module LessonSort {
    public func compare(l1 : Lesson, l2 : Lesson) : Order.Order {
      Nat.compare(l1.id, l2.id);
    };
  };

  func isParent(principal : Principal) : Bool {
    switch (userRoles.get(principal)) {
      case (?#parent) { true };
      case (_) { false };
    };
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can get their profile");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
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
    userRoles.add(caller, profile.role);
  };

  public shared ({ caller }) func setDisplayName(name : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can set display name");
    };
    displayNames.add(caller, name);
  };

  public query ({ caller }) func getDisplayName(user : Principal) : async ?Text {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own display name");
    };
    displayNames.get(user);
  };

  public query ({ caller }) func getCallerRole() : async UserRole {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can get their role");
    };
    switch (userRoles.get(caller)) {
      case (null) { #student };
      case (?role) { role };
    };
  };

  public shared ({ caller }) func setCallerRole(role : UserRole) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can set their role");
    };
    userRoles.add(caller, role);
    switch (userProfiles.get(caller)) {
      case (?profile) { userProfiles.add(caller, { profile with role }) };
      case (null) {};
    };
  };

  public query ({ caller }) func getUserRole(user : Principal) : async UserRole {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own role");
    };
    switch (userRoles.get(user)) {
      case (null) { #student };
      case (?role) { role };
    };
  };

  public shared ({ caller }) func setupContent() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can set up content");
    };

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

    let miniGameItems = [{ id = 1; pairs = [("🐶", "Dog"), ("🍎", "Apple")] }];
    for (miniGame in miniGameItems.values()) {
      miniGameContents.add(miniGame);
    };
  };

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

    if (progress.completedLessons.any(func(id : Nat) : Bool { id == lessonId })) {
      Runtime.trap("Lesson already completed");
    };

    let newCompletedLessons = progress.completedLessons.clone();
    newCompletedLessons.add(lessonId);
    sessionProgress.add(sessionId, { progress with completedLessons = newCompletedLessons });
  };

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

    if (progress.earnedBadges.any(func(b : Text) : Bool { b == badgeId })) {
      Runtime.trap("Badge already awarded");
    };

    let newEarnedBadges = progress.earnedBadges.clone();
    newEarnedBadges.add(badgeId);
    sessionProgress.add(sessionId, { progress with earnedBadges = newEarnedBadges });
  };

  public query ({ caller }) func getSessionProgress(targetPrincipal : Principal) : async SessionProgress {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view progress");
    };
    let callerIsOwner = caller == targetPrincipal;
    let callerIsAdmin = AccessControl.isAdmin(accessControlState, caller);
    let callerIsParent = isParent(caller);
    if (not callerIsOwner and not callerIsAdmin and not callerIsParent) {
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

  func toPublicSessionProgress(progress : InternalSessionProgress) : SessionProgress {
    {
      completedLessons = progress.completedLessons.toArray();
      quizResults = progress.quizResults.toArray();
      earnedBadges = progress.earnedBadges.toArray();
    };
  };

  public shared ({ caller }) func recordGameSession(gameType : GameType, language : Text, score : Nat, totalQuestions : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can record game sessions");
    };

    let session : GameSession = {
      userId = caller;
      gameType;
      language;
      score;
      totalQuestions;
      timestamp = Time.now();
    };

    gameSessions.add(session);

    let userStats = switch (perUserGameStats.get(caller)) {
      case (null) { Map.empty<GameType, GameStatistics>() };
      case (?stats) { stats };
    };

    let currentStats = switch (userStats.get(gameType)) {
      case (null) {
        {
          bestScore = score;
          totalSessions = 1;
          totalScore = score;
          averageScore = score;
        };
      };
      case (?s) {
        {
          bestScore = Nat.max(s.bestScore, score);
          totalSessions = s.totalSessions + 1;
          totalScore = s.totalScore + score;
          averageScore = (s.totalScore + score) / (s.totalSessions + 1);
        };
      };
    };
    userStats.add(gameType, currentStats);
    perUserGameStats.add(caller, userStats);
  };

  public query ({ caller }) func getUserGameSessions(userId : Principal) : async [GameSession] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view game sessions");
    };
    let callerIsOwner = caller == userId;
    let callerIsAdmin = AccessControl.isAdmin(accessControlState, caller);
    let callerIsParent = isParent(caller);
    if (not callerIsOwner and not callerIsAdmin and not callerIsParent) {
      Runtime.trap("Unauthorized: Can only view your own game sessions");
    };

    let sessionIter = gameSessions.values();
    let filtered = sessionIter.filter(
      func(session) { session.userId == userId }
    );
    filtered.toArray();
  };

  public query ({ caller }) func getUserGameStatistics(userId : Principal, gameType : GameType) : async ?GameStatistics {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view game statistics");
    };
    let callerIsOwner = caller == userId;
    let callerIsAdmin = AccessControl.isAdmin(accessControlState, caller);
    let callerIsParent = isParent(caller);
    if (not callerIsOwner and not callerIsAdmin and not callerIsParent) {
      Runtime.trap("Unauthorized: Can only view your own game statistics");
    };

    switch (perUserGameStats.get(userId)) {
      case (null) { null };
      case (?userStats) {
        userStats.get(gameType);
      };
    };
  };

  public query ({ caller }) func getGameTypeAverage(gameType : GameType) : async ?{ totalSessions : Nat; averageScore : Nat } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view aggregated statistics");
    };

    var totalScore = 0;
    var sessionCount = 0;
    let sessionsIter = gameSessions.values();
    sessionsIter.forEach(
      func(session) {
        if (session.gameType == gameType) {
          sessionCount += 1;
          totalScore += session.score;
        };
      }
    );

    if (sessionCount == 0) { null } else {
      ?{
        totalSessions = sessionCount;
        averageScore = totalScore / sessionCount;
      };
    };
  };

  public query ({ caller }) func getAllSessionsProgress() : async [(Text, SessionProgress)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view all progress");
    };
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all progress");
    };
    let result = List.empty<(Text, SessionProgress)>();
    for ((sessionId, progress) in sessionProgress.entries()) {
      result.add((sessionId, toPublicSessionProgress(progress)));
    };
    result.toArray();
  };

  public query func getTasks() : async [Task] {
    let result = List.empty<Task>();
    for ((_, task) in tasks.entries()) {
      result.add(task);
    };
    result.toArray();
  };

  public shared ({ caller }) func createTask(taskInput : TaskInput) : async Task {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create tasks");
    };
    if (not AccessControl.isAdmin(accessControlState, caller) and not isParent(caller)) {
      Runtime.trap("Unauthorized: Only admins or parents can create tasks");
    };
    let newTask : Task = {
      id = nextTaskId;
      title = taskInput.title;
      description = taskInput.description;
      points = taskInput.points;
      isCompleted = false;
    };
    tasks.add(nextTaskId, newTask);
    nextTaskId += 1;
    newTask;
  };

  public shared ({ caller }) func updateTask(id : Nat, taskUpdate : TaskUpdate) : async ?Task {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can update tasks");
    };
    if (not AccessControl.isAdmin(accessControlState, caller) and not isParent(caller)) {
      Runtime.trap("Unauthorized: Only admins or parents can update tasks");
    };
    switch (tasks.get(id)) {
      case (null) {
        null;
      };
      case (?existingTask) {
        let updatedTask : Task = {
          id;
          title = taskUpdate.title;
          description = taskUpdate.description;
          points = taskUpdate.points;
          isCompleted = existingTask.isCompleted;
        };
        tasks.add(id, updatedTask);
        ?updatedTask;
      };
    };
  };

  public shared ({ caller }) func markTaskComplete(id : Nat) : async ?Task {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can mark tasks as complete");
    };
    switch (tasks.get(id)) {
      case (null) { null };
      case (?task) {
        let completedTask : Task = { task with isCompleted = true };
        tasks.add(id, completedTask);
        ?completedTask;
      };
    };
  };
};
