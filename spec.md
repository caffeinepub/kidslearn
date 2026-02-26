# Specification

## Summary
**Goal:** Transform the KidsLearn India app into a vibrant, trilingual (Telugu/Hindi/English) learning platform for ages 3–12 with dedicated Maths, Science, and History sections.

**Planned changes:**
- Apply a bright, kid-friendly color palette (sunshine yellow, grass green, sky blue, coral, tangerine) with rounded shapes and large playful fonts (Fredoka One, Nunito) throughout the entire app; remove muted/adult tones
- Restrict age group selection to 3–12 years only, with tiers 3–5, 6–8, and 9–12; remove any groups outside this range
- Update the language switcher to show exactly three options: Telugu, Hindi, English; remove Tamil from all language selection UI; persist selection via sessionStorage
- Update SubjectSelection page to show exactly three primary subjects: Maths, Science, and History, each with a distinct card, color, icon, and navigation
- Expand Maths section to include number recognition cards (1–100) in all three languages, interactive counting activities, and basic addition exercises with visual aids (fruit/animal icons)
- Build a Science section with three sub-sections: Body Parts (illustrated diagram, 10+ labelled parts), Animals (15+ flashcards), and Plants (10+ flashcards), each card with a text-to-speech button; all content in the selected language
- Build a History section with an interactive India map listing all 28 states and 8 union territories; each state shows name, capital, and emoji in the selected language; tapping reveals a detail card
- Expand languageData.ts with Telugu, Hindi, and English translations for number words 1–100, 10+ body parts, 15+ animal names, 10+ plant names, and all Indian state/capital names

**User-visible outcome:** Kids aged 3–12 can select their age group, choose from Maths, Science, or History, switch between Telugu, Hindi, and English at any time, and interact with richly illustrated number cards, counting games, addition exercises, body part diagrams, animal/plant flashcards with audio, and a tappable India states map — all in a bright, playful UI.
