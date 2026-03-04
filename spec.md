# KidsLearn

## Current State
A multilingual kids' learning app (ages 3–12) with sections for Alphabet, Numbers, Vocabulary, Poems, Picture Learning, Flashcards, Quiz, Matching Game, Puzzle, Timed Challenge, Mini Games, Progress tracking, and Donation. Supports 4 languages (Telugu, Hindi, Tamil, English). Built with React + TypeScript + Tailwind. Routes managed via @tanstack/react-router. Existing pages are in src/frontend/src/pages/.

## Requested Changes (Diff)

### Add
- A new **Calendar Month Learning** page (`/calendar`) that teaches children all 12 months of the year in all 4 languages (Telugu, Hindi, Tamil, English).
- Each month card shows:
  - Month number (1–12)
  - Month name in all 4 languages
  - A themed cartoon-style illustration representing the month/season
  - Fun facts or seasonal notes (e.g., January = New Year, December = Winter/Christmas)
- Full-screen month view: clicking a month card expands it to show the full-size picture, name in all 4 languages, and a fun fact.
- Navigation between months (prev/next arrows) in the full-screen view.
- Language switcher to highlight one language at a time (while still showing all 4).
- 12 AI-generated seasonal/monthly cartoon images, one per month.
- New nav card "📅 Months" added to Home page grid and KidsDashboard learning modules.
- New route `/calendar` added to App.tsx.

### Modify
- `App.tsx` — add CalendarLesson import and route.
- `Home.tsx` — add "📅 Months" nav card to NAV_CARDS array.
- `KidsDashboard.tsx` — add "📅 Months" entry to LEARNING_MODULES array.

### Remove
- Nothing removed.

## Implementation Plan
1. Generate 12 seasonal cartoon images for each month via generate_image tool.
2. Create `src/frontend/src/pages/CalendarLesson.tsx` with:
   - Grid of 12 month cards (kid-friendly, colorful).
   - Each card: month number, month image, month name in 4 languages.
   - Language selector tabs (Telugu, Hindi, Tamil, English).
   - Full-screen modal/overlay on card click showing enlarged image, all 4 language names, and a fun seasonal note.
   - Prev/Next navigation in full-screen view.
3. Add route and import to `App.tsx`.
4. Add nav card to `Home.tsx` NAV_CARDS array.
5. Add learning module to `KidsDashboard.tsx` LEARNING_MODULES array.
