import Map "mo:core/Map";
import Principal "mo:core/Principal";
import List "mo:core/List";

module {
  type OldUserRole = {
    #student;
    #parent;
  };

  type OldUserProfile = {
    name : Text;
    role : OldUserRole;
  };

  type GameStatistics = {
    bestScore : Nat;
    totalSessions : Nat;
    totalScore : Nat;
    averageScore : Nat;
  };

  type InternalTask = {
    id : Nat;
    title : Text;
    description : Text;
    points : Nat;
    isCompleted : Bool;
  };

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

  type InternalSessionProgress = {
    completedLessons : List.List<Nat>;
    quizResults : List.List<QuizResult>;
    earnedBadges : List.List<Text>;
  };

  type GameSession = {
    userId : Principal;
    gameType : OldGameType;
    language : Text;
    score : Nat;
    totalQuestions : Nat;
    timestamp : Int;
  };

  type OldActor = {
    userProfiles : Map.Map<Principal, OldUserProfile>;
    userRoles : Map.Map<Principal, OldUserRole>;
    displayNames : Map.Map<Principal, Text>;
    tasks : Map.Map<Nat, InternalTask>;
    nextTaskId : Nat;
    lessons : List.List<Lesson>;
    flashcards : List.List<Flashcard>;
    quizQuestions : List.List<QuizQuestion>;
    miniGameContents : List.List<MiniGameContent>;
    sessionProgress : Map.Map<Text, InternalSessionProgress>;
    gameSessions : List.List<GameSession>;
    perUserGameStats : Map.Map<Principal, Map.Map<OldGameType, GameStatistics>>;
  };

  type NewUserProfile = {
    name : Text;
    role : OldUserRole;
    avatarId : Text;
  };

  type NewActor = {
    userProfiles : Map.Map<Principal, NewUserProfile>;
    userRoles : Map.Map<Principal, OldUserRole>;
    displayNames : Map.Map<Principal, Text>;
    tasks : Map.Map<Nat, InternalTask>;
    nextTaskId : Nat;
    lessons : List.List<Lesson>;
    flashcards : List.List<Flashcard>;
    quizQuestions : List.List<QuizQuestion>;
    miniGameContents : List.List<MiniGameContent>;
    sessionProgress : Map.Map<Text, InternalSessionProgress>;
    gameSessions : List.List<GameSession>;
    perUserGameStats : Map.Map<Principal, Map.Map<OldGameType, GameStatistics>>;
  };

  /*
    Games:
      - Matching
      - Puzzles
      - Study Challenges (maybe timed challenges or something for multiple attempts)
      - Quizzes (spelling, reading, etc)
  */
  type OldGameType = {
    #timedChallenge;
    #matchingGame;
    #puzzle;
    #quiz;
  };

  public func run(old : OldActor) : NewActor {
    let newUserProfiles = old.userProfiles.map<Principal, OldUserProfile, NewUserProfile>(
      func(_id, oldProfile) {
        { oldProfile with avatarId = oldProfile.name };
      }
    );

    { old with userProfiles = newUserProfiles };
  };
};
