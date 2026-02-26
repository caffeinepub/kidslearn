import List "mo:core/List";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Migration "migration";

import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import Storage "blob-storage/Storage";

// DATA PERSISTENCE: Apply migration module in the with-clause
(with migration = Migration.run)
actor {
  // Access control state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // ────────────────────────── Types ──────────────────────────────────────────
  public type UserProfile = {
    name : Text;
    email : Text;
    avatarUrl : Text;
  };

  public type KidsProfile = {
    name : Text;
    avatar : Text;
    age : Nat;
    pin : Text;
  };

  public type ParentalControls = {
    contentRestrictions : [Text];
    gamesAllowed : [Nat];
  };

  public type Lesson = {
    id : Nat;
    title : Text;
    body : Text;
    image : Text;
  };

  public type Flashcard = {
    id : Nat;
    front : Text;
    back : Text;
    image : Text;
  };

  public type QuizQuestion = {
    id : Nat;
    question : Text;
    options : [Text];
    correctIndex : Nat;
  };

  public type MiniGameContent = {
    id : Nat;
    pairs : [(Text, Text)];
  };

  public type QuizResult = {
    subject : Text;
    score : Nat;
    total : Nat;
  };

  public type SessionProgress = {
    completedLessons : [Nat];
    quizResults : [QuizResult];
    earnedBadges : [Text];
  };

  public type GameType = {
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

  public type GameSession = {
    userId : Principal;
    gameType : GameType;
    language : Text;
    score : Nat;
    totalQuestions : Nat;
    timestamp : Time.Time;
  };

  public type GameStatistics = {
    bestScore : Nat;
    totalSessions : Nat;
    totalScore : Nat;
    averageScore : Nat;
  };

  public type NumberCard = {
    number : Nat;
    telugu : Text;
    hindi : Text;
    english : Text;
    audioUrl : Text;
  };

  public type AdditionProblem = {
    firstNumber : Nat;
    secondNumber : Nat;
    answer : Nat;
    telugu : Text;
    hindi : Text;
    english : Text;
  };

  public type BodyPart = {
    nameTelugu : Text;
    nameHindi : Text;
    nameEnglish : Text;
    imageUrl : Text;
    audioUrl : Text;
  };

  public type AnimalCard = {
    nameTelugu : Text;
    nameHindi : Text;
    nameEnglish : Text;
    imageUrl : Text;
    audioUrl : Text;
  };

  public type PlantCard = {
    nameTelugu : Text;
    nameHindi : Text;
    nameEnglish : Text;
    imageUrl : Text;
    audioUrl : Text;
  };

  public type StateInfo = {
    nameTelugu : Text;
    nameHindi : Text;
    nameEnglish : Text;
    capitalTelugu : Text;
    capitalHindi : Text;
    capitalEnglish : Text;
    emoji : Text;
    stateId : Nat;
  };

  public type LearningContentPackage = {
    numberCards : [NumberCard];
    additionProblems : [AdditionProblem];
    bodyParts : [BodyPart];
    animalCards : [AnimalCard];
    plantCards : [PlantCard];
    stateInfos : [StateInfo];
  };

  type InternalQuizResult = QuizResult;
  type InternalSessionProgress = {
    completedLessons : List.List<Nat>;
    quizResults : List.List<InternalQuizResult>;
    earnedBadges : List.List<Text>;
  };

  // ────────────────────────── Storage ────────────────────────────────────────
  let userProfiles = Map.empty<Principal, UserProfile>();
  let kidsProfiles = Map.empty<Principal, KidsProfile>();
  let parentalControls = Map.empty<Principal, ParentalControls>();
  let displayNames = Map.empty<Principal, Text>();

  let lessons : List.List<Lesson> = List.empty<Lesson>();
  let flashcards : List.List<Flashcard> = List.empty<Flashcard>();
  let quizQuestions : List.List<QuizQuestion> = List.empty<QuizQuestion>();
  let miniGameContents : List.List<MiniGameContent> = List.empty<MiniGameContent>();
  let sessionProgress = Map.empty<Text, InternalSessionProgress>();
  let gameSessions = List.empty<GameSession>();

  let numberCards : List.List<NumberCard> = List.empty<NumberCard>();
  let additionProblems : List.List<AdditionProblem> = List.empty<AdditionProblem>();
  let bodyParts : List.List<BodyPart> = List.empty<BodyPart>();
  let animalCards : List.List<AnimalCard> = List.empty<AnimalCard>();
  let plantCards : List.List<PlantCard> = List.empty<PlantCard>();
  let stateInfos : List.List<StateInfo> = List.empty<StateInfo>();

  let emptyGameStatsMap = Map.empty<GameType, GameStatistics>();
  let perUserGameStats = Map.empty<Principal, Map.Map<GameType, GameStatistics>>();

  module LessonSort {
    public func compare(l1 : Lesson, l2 : Lesson) : Order.Order {
      Nat.compare(l1.id, l2.id);
    };
  };

  // ──────────────────────── User Profile Logic ───────────────────────────────
  // Required by the frontend: getCallerUserProfile, saveCallerUserProfile, getUserProfile

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get their profile");
    };
    userProfiles.get(caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  // ──────────────────────── Kids Profile Logic ───────────────────────────────
  public shared ({ caller }) func createKidsProfile(profile : KidsProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create a kids profile");
    };
    kidsProfiles.add(caller, profile);
  };

  public query ({ caller }) func getKidsProfile() : async ?KidsProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can get their kids profile");
    };
    kidsProfiles.get(caller);
  };

  public shared ({ caller }) func updateKidsProfile(profile : KidsProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can update their kids profile");
    };
    kidsProfiles.add(caller, profile);
  };

  // Only authenticated users can verify their own PIN.
  public shared ({ caller }) func verifyKidsPin(pin : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can verify their kids PIN");
    };
    switch (kidsProfiles.get(caller)) {
      case (?profile) { profile.pin == pin };
      case (null) { false };
    };
  };

  public shared ({ caller }) func updateKidsPin(newPin : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can update their kids pin");
    };
    switch (kidsProfiles.get(caller)) {
      case (?profile) {
        let updatedProfile = { profile with pin = newPin };
        kidsProfiles.add(caller, updatedProfile);
      };
      case (null) {
        Runtime.trap("Kids profile does not exist");
      };
    };
  };

  // ─────────────────────── Parental Controls Logic ───────────────────────────
  public shared ({ caller }) func setParentalControls(settings : ParentalControls) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can set parental controls");
    };
    parentalControls.add(caller, settings);
  };

  public query ({ caller }) func getParentalControls() : async ?ParentalControls {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can get parental controls");
    };
    parentalControls.get(caller);
  };

  // Backend function to store display name
  public shared ({ caller }) func setDisplayName(name : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can set display name");
    };
    displayNames.add(caller, name);
  };

  public query ({ caller }) func getDisplayName() : async ?Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can get their display name");
    };
    displayNames.get(caller);
  };

  // ─────────────────── Content Setup (Admin Only) ────────────────────────────
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

  // ────────────────── Learning Content Setup (Admin Only) ────────────────────
  public shared ({ caller }) func setupLearningContent() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can set up learning content");
    };

    let numberCardItems = [
      { number = 1; telugu = "ఒకటి"; hindi = "एक"; english = "One"; audioUrl = "audio/1.mp3" },
      {
        number = 2;
        telugu = "రెండు";
        hindi = "दो";
        english = "Two";
        audioUrl = "audio/2.mp3";
      },
    ];
    for (numberCard in numberCardItems.values()) {
      numberCards.add(numberCard);
    };

    let additionProblemItems = [
      {
        firstNumber = 1;
        secondNumber = 2;
        answer = 3;
        telugu = "ఒకటి + రెండు = మూడు";
        hindi = "एक + दो = तीन";
        english = "One + Two = Three";
      },
      {
        firstNumber = 2;
        secondNumber = 3;
        answer = 5;
        telugu = "రెండు + మూడు = ఐదు";
        hindi = "दो + तीन = पांच";
        english = "Two + Three = Five";
      },
    ];
    for (additionProblem in additionProblemItems.values()) {
      additionProblems.add(additionProblem);
    };

    let bodyPartItems = [
      {
        nameTelugu = "ముఖం";
        nameHindi = "चेहरा";
        nameEnglish = "Face";
        imageUrl = "images/face.png";
        audioUrl = "audio/face.mp3";
      },
      {
        nameTelugu = "చేతులు";
        nameHindi = "हाथ";
        nameEnglish = "Hands";
        imageUrl = "images/hands.png";
        audioUrl = "audio/hands.mp3";
      },
    ];
    for (bodyPart in bodyPartItems.values()) {
      bodyParts.add(bodyPart);
    };

    let animalCardItems = [
      {
        nameTelugu = "కుక్క";
        nameHindi = "कुत्ता";
        nameEnglish = "Dog";
        imageUrl = "images/dog.png";
        audioUrl = "audio/dog.mp3";
      },
      {
        nameTelugu = "కోడి";
        nameHindi = "मुर्गा";
        nameEnglish = "Chicken";
        imageUrl = "images/chicken.png";
        audioUrl = "audio/chicken.mp3";
      },
    ];
    for (animalCard in animalCardItems.values()) {
      animalCards.add(animalCard);
    };

    let plantCardItems = [
      {
        nameTelugu = "గులాబీ";
        nameHindi = "गुलाब";
        nameEnglish = "Rose";
        imageUrl = "images/rose.png";
        audioUrl = "audio/rose.mp3";
      },
      {
        nameTelugu = "తులస్సి";
        nameHindi = "तुलसी";
        nameEnglish = "Basil";
        imageUrl = "images/basil.png";
        audioUrl = "audio/basil.mp3";
      },
    ];
    for (plantCard in plantCardItems.values()) {
      plantCards.add(plantCard);
    };

    let stateInfoItems = [
      {
        nameTelugu = "తెలంగాణ";
        nameHindi = "तेलंगाना";
        nameEnglish = "Telangana";
        capitalTelugu = "హైదరాబాద్";
        capitalHindi = "हैदराबाद";
        capitalEnglish = "Hyderabad";
        emoji = "🗺️";
        stateId = 1;
      },
      {
        nameTelugu = "మహారాష్ట్ర";
        nameHindi = "महाराष्ट्र";
        nameEnglish = "Maharashtra";
        capitalTelugu = "ముంబై";
        capitalHindi = "मुंबई";
        capitalEnglish = "Mumbai";
        emoji = "🏙️";
        stateId = 2;
      },
    ];
    for (stateInfo in stateInfoItems.values()) {
      stateInfos.add(stateInfo);
    };
  };

  // ───── Public Learning Content Query (Authenticated Users Only) ─────
  public query ({ caller }) func getLearningContentPackage() : async LearningContentPackage {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can access learning content");
    };

    {
      numberCards = numberCards.toArray();
      additionProblems = additionProblems.toArray();
      bodyParts = bodyParts.toArray();
      animalCards = animalCards.toArray();
      plantCards = plantCards.toArray();
      stateInfos = stateInfos.toArray();
    };
  };

  // ──────────────────── Public Content Queries ───────────────────────────────
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

  // ───────────────────────── Progress Tracking ───────────────────────────────
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

  // Only admins can award badges to arbitrary principals.
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

  // Viewing progress:
  //   - A user can always view their own progress.
  //   - Admins can view any user's progress.
  public query ({ caller }) func getSessionProgress(targetPrincipal : Principal) : async SessionProgress {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view progress");
    };
    let callerIsOwner = caller == targetPrincipal;
    let callerIsAdmin = AccessControl.isAdmin(accessControlState, caller);
    if (not callerIsOwner and not callerIsAdmin) {
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

  // ────────────────────────── Game Sessions ─────────────────────────────────
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

  // Viewing individual game sessions:
  //   - A user can view their own sessions.
  //   - Admins can view any user's sessions.
  public query ({ caller }) func getUserGameSessions(userId : Principal) : async [GameSession] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view game sessions");
    };
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own game sessions");
    };

    gameSessions.filter(
      func(session) { session.userId == userId }
    ).toArray();
  };

  // Viewing per-user game statistics:
  //   - A user can view their own statistics.
  //   - Admins can view any user's statistics.
  public query ({ caller }) func getUserGameStatistics(userId : Principal, gameType : GameType) : async ?GameStatistics {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view game statistics");
    };
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own game statistics");
    };

    switch (perUserGameStats.get(userId)) {
      case (null) { null };
      case (?userStats) {
        userStats.get(gameType);
      };
    };
  };

  // Aggregated statistics across all users — accessible to authenticated users
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

  // Returns aggregated progress data across all tracked sessions — for admins only.
  public query ({ caller }) func getAllSessionsProgress() : async [(Text, SessionProgress)] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all progress");
    };
    let result = List.empty<(Text, SessionProgress)>();
    for ((sessionId, progress) in sessionProgress.entries()) {
      result.add((sessionId, toPublicSessionProgress(progress)));
    };
    result.toArray();
  };
};
