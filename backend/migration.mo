import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Array "mo:core/Array";

module {
  // Persistent Types
  type KidsProfile = {
    name : Text;
    avatar : Text;
    age : Nat;
    pin : Text;
  };

  type ParentalControls = {
    contentRestrictions : [Text];
    gamesAllowed : [Nat];
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

  type GameType = {
    #timedChallenge;
    #matchingGame;
    #puzzle;
    #quiz;
  };

  type GameSession = {
    userId : Principal.Principal;
    gameType : GameType;
    language : Text;
    score : Nat;
    totalQuestions : Nat;
    timestamp : Int;
  };

  type GameStatistics = {
    bestScore : Nat;
    totalSessions : Nat;
    totalScore : Nat;
    averageScore : Nat;
  };

  // Old and New Actor Types
  type OldActor = {
    kidsProfiles : Map.Map<Principal.Principal, KidsProfile>;
    parentalControls : Map.Map<Principal.Principal, ParentalControls>;
    displayNames : Map.Map<Principal.Principal, Text>;
    lessons : List.List<Lesson>;
    flashcards : List.List<Flashcard>;
    quizQuestions : List.List<QuizQuestion>;
    miniGameContents : List.List<MiniGameContent>;
    sessionProgress : Map.Map<Text, InternalSessionProgress>;
    gameSessions : List.List<GameSession>;
    perUserGameStats : Map.Map<Principal.Principal, Map.Map<GameType, GameStatistics>>;
  };

  type NewActor = {
    kidsProfiles : Map.Map<Principal.Principal, KidsProfile>;
    parentalControls : Map.Map<Principal.Principal, ParentalControls>;
    displayNames : Map.Map<Principal.Principal, Text>;
    lessons : List.List<Lesson>;
    flashcards : List.List<Flashcard>;
    quizQuestions : List.List<QuizQuestion>;
    miniGameContents : List.List<MiniGameContent>;
    sessionProgress : Map.Map<Text, InternalSessionProgress>;
    gameSessions : List.List<GameSession>;
    perUserGameStats : Map.Map<Principal.Principal, Map.Map<GameType, GameStatistics>>;
    numberCards : List.List<{ number : Nat; telugu : Text; hindi : Text; english : Text; audioUrl : Text }>;
    additionProblems : List.List<{ firstNumber : Nat; secondNumber : Nat; answer : Nat; telugu : Text; hindi : Text; english : Text }>;
    bodyParts : List.List<{ nameTelugu : Text; nameHindi : Text; nameEnglish : Text; imageUrl : Text; audioUrl : Text }>;
    animalCards : List.List<{ nameTelugu : Text; nameHindi : Text; nameEnglish : Text; imageUrl : Text; audioUrl : Text }>;
    plantCards : List.List<{ nameTelugu : Text; nameHindi : Text; nameEnglish : Text; imageUrl : Text; audioUrl : Text }>;
    stateInfos : List.List<{ nameTelugu : Text; nameHindi : Text; nameEnglish : Text; capitalTelugu : Text; capitalHindi : Text; capitalEnglish : Text; emoji : Text; stateId : Nat }>;
  };

  public func run(old : OldActor) : NewActor {
    // Initialize new fields with empty lists or default values
    let numberCards = List.empty<{ number : Nat; telugu : Text; hindi : Text; english : Text; audioUrl : Text }>();
    let additionProblems = List.empty<{ firstNumber : Nat; secondNumber : Nat; answer : Nat; telugu : Text; hindi : Text; english : Text }>();
    let bodyParts = List.empty<{ nameTelugu : Text; nameHindi : Text; nameEnglish : Text; imageUrl : Text; audioUrl : Text }>();
    let animalCards = List.empty<{ nameTelugu : Text; nameHindi : Text; nameEnglish : Text; imageUrl : Text; audioUrl : Text }>();
    let plantCards = List.empty<{ nameTelugu : Text; nameHindi : Text; nameEnglish : Text; imageUrl : Text; audioUrl : Text }>();
    let stateInfos = List.empty<{ nameTelugu : Text; nameHindi : Text; nameEnglish : Text; capitalTelugu : Text; capitalHindi : Text; capitalEnglish : Text; emoji : Text; stateId : Nat }>();

    // Return the new actor state
    {
      old with
      numberCards;
      additionProblems;
      bodyParts;
      animalCards;
      plantCards;
      stateInfos;
    };
  };
};
