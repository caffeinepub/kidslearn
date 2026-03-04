# KidsLearn

## Current State
A multilingual kids learning app (ages 3–12) with alphabet, numbers, vocabulary, poems, flashcards, quizzes, matching game, puzzle, timed challenge, and mini games. Four languages: English, Telugu, Hindi, Tamil. Full-screen swipe-based alphabet and numbers lesson pages with text-to-speech. Vocabulary full-screen cards. Lessons page with emoji-based content. Flashcards flip-card UI. Poems page with individual line speak buttons. The app uses `font-heading` and `font-body` CSS classes alongside `font-nunito` and `font-fredoka`.

## Requested Changes (Diff)

### Add
- Nothing new to add

### Modify
- **Font style**: All text throughout the app (alphabet cards, numbers cards, vocabulary cards, lesson cards, flashcards, poems, home nav cards) must use clean, normal, readable font — specifically `font-sans` or `font-nunito` with `font-bold` or `font-semibold`. Remove any decorative/cursive font classes. Replace `font-heading`, `font-body`, `font-fredoka` with plain `font-bold` or `font-semibold` using a clean sans-serif stack.
- **Alphabet lesson (AlphabetLesson.tsx)**: Each letter card must prominently show: (1) Giant letter, (2) Large picture/image below it (already has ENGLISH_IMAGE_MAP for English, but needs the emoji to display LARGE for non-English languages), (3) Word label clearly below the image. Image size should be bigger (min 200px, max 350px). Word label should be bigger (clamp 2.5rem, 6vw, 5rem). Letter font size should be at least `clamp(7rem, 28vw, 20rem)`.
- **Numbers lesson (NumbersLesson.tsx)**: Each number card must show: (1) Giant numeral, (2) Large emoji below it (bigger — clamp(100px, 22vw, 200px)), (3) Word label in the selected language clearly below. Word label font bigger (clamp 2.5rem, 6vw, 5rem).
- **Vocabulary lesson (VocabularyLesson.tsx)**: Emoji size bigger (clamp(120px, 30vw, 260px)). Word label font bigger (clamp 2.5rem, 7vw, 5.5rem). Replace `font-heading` with `font-bold` (sans-serif).
- **Lessons page (Lessons.tsx)**: Lesson body text size should be `text-2xl` instead of `text-xl`. Replace `font-fredoka` with `font-bold` in headings. Emoji in illustration area should be `text-[10rem]` instead of `text-9xl`.
- **Flashcards (Flashcards.tsx)**: Replace all `font-heading` and `font-body` with `font-bold` (sans-serif). Card front word label bigger (`text-4xl`). Emoji bigger (`text-8xl`).
- **Poems (PoemsLesson.tsx)**: Replace `font-heading` and `font-body` with `font-bold`/`font-semibold`. Poem line text bigger (`text-2xl`). Title bigger (`text-4xl`).
- **Home (Home.tsx)**: Replace `font-heading`/`font-body` with `font-bold`. Nav card title font — ensure bold, normal sans-serif. Hero heading uses clean bold font, no decorative font.
- **AgeGroupSelection.tsx**: Replace `font-fredoka` with `font-bold` (clean sans-serif). Headings still bold and large.

### Remove
- All uses of `font-fredoka`, `font-heading`, `font-body` in these pages — replaced with plain `font-bold` or `font-semibold` using the default sans-serif (Nunito is already loaded and is a clean font, so `font-nunito font-bold` is acceptable as a replacement).

## Implementation Plan
1. Update `AlphabetLesson.tsx`: increase image size, letter size, word label size, replace decorative font classes.
2. Update `NumbersLesson.tsx`: increase emoji size, word label size, replace decorative font classes.
3. Update `VocabularyLesson.tsx`: increase emoji size, word label size, replace font classes.
4. Update `Lessons.tsx`: increase body text and emoji sizes, replace decorative font classes.
5. Update `Flashcards.tsx`: increase word/emoji sizes, replace font classes.
6. Update `PoemsLesson.tsx`: increase poem line text size, replace font classes.
7. Update `Home.tsx`: replace decorative font classes with clean bold fonts.
8. Update `AgeGroupSelection.tsx`: replace `font-fredoka` with `font-bold` clean sans.
9. Typecheck and build to verify no errors.
