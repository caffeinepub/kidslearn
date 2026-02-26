# Specification

## Summary
**Goal:** Add a post-login profile screen with avatar selection and progress stats, auto-launch the learning dashboard after the profile screen, store avatar data in the backend, and optimise the kids dashboard for faster initial load.

**Planned changes:**
- Create a post-login profile screen that appears immediately after Internet Identity login, showing a selectable avatar (8+ kid-friendly emoji/character options), editable display name, current level, earned badges grid, lessons completed, quizzes taken, and points earned
- Add a "Start Learning" / "Continue" button on the profile screen that navigates to the learning dashboard with an animated kid-friendly page transition
- If the user has prior lesson progress, the dashboard highlights the next incomplete lesson as recommended; otherwise a beginner-friendly first lesson is highlighted
- Extend the backend Motoko profile data structure with an `avatarId` field; add update and query support for it
- Add skeleton loaders to the kids dashboard for games, tasks, and rewards sections; priority-load progress stats and recommended lesson card first
- Use React Query caching on the dashboard to avoid redundant backend calls on repeated visits

**User-visible outcome:** After logging in, kids see their profile screen with their avatar, stats, and badges, then proceed to the learning dashboard which loads quickly and highlights exactly where they should start or continue learning.
