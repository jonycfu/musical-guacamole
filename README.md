# Description

- A Hangman App created with Angular + NGRX
- A simple Express App to serve HTTP requests for fetching hangman word list

## UX Flow

1. User starts with the menu screen of game, with two choices:
   - **New Game** a new hangman game
   - **View High Scores**, based on a HTTP fetch of previous scores, including your stored score entries
2. When a new game is selected, a hangman will appear with the masked letters `_ _ _` to indicate the secret word to be guessed, along with a one-line clue. A UI alphanumeral keyboard will also appear for input.
3. Per guess, the user is allowed only a single character. Thus, most-recent inputs will replace the previous character when chosen.
4. Once a letter is submitted, that same letter cannot be selected again, and be disabled, regardless of the two outcomes:
   - **Correct guesses** will reveal all corresponding characters in the secret word. If the secret word is fully revealed, a prompt of your score will appear and a choice of submitting your name and "view high scores" is given.
   - **Wrong guesses** will cause a hangman body part to be drawn, up to a 5 attempts limit, at which point the hangman is fully drawn, and the user is no longer able to play, and prompted with a "Game Over" and a "New Game"

## Getting Started

After installing your dependencies (`npm i`), there are two necessary steps:

1. First, serve your express-api-server, run `npm run api`

2. To work on the app directly, you will need to run `npm start`, which is modified for serving the Angular app which calls api calls from the Express App. Navigate to `http://localhost:4200/`.

## Folder Structure Conventions

For the most part, I kept the 'by-feature' folder structure as specified by Angular's Styleguide, except for a few minority files.

- The project is split by big-features, angular-type artifacts, and pages.

- utilizing the angular command line tool is immensely helpful in scaffolding the common boilerplates or copy-paste (assuming you understand what's created)

---

_This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21._

```
./src/app
├── app-routing.module.ts
├── app.component.html
├── app.component.scss
├── app.component.spec.ts
├── app.component.ts
├── app.module.ts
├── core
│   ├── core.module.ts
│   └── services
├── game
│   ├── actions
│   ├── components
│   ├── effects
│   ├── game-routing.module.ts
│   ├── game.component.html
│   ├── game.component.scss
│   ├── game.component.spec.ts
│   ├── game.component.ts
│   ├── game.guard.spec.ts
│   ├── game.guard.ts
│   ├── game.module.ts
│   ├── pages
│   └── reducers
├── home
│   ├── home-routing.module.ts
│   ├── home.component.html
│   ├── home.component.scss
│   ├── home.component.spec.ts
│   ├── home.component.ts
│   ├── home.module.ts
│   └── reducers
├── reducers
│   └── index.ts
└── shared
    ├── list
    └── shared.module.ts

13 directories, 23 files

```

## Coding Guidelines

- For most file names, use Angular's file-naming convention `<FILENAME>.<GROUP_TYPE>.ts` (e.g. `app.module.ts`, `word-api.service.ts`)

- For any work that needs to be deferred, use syntax `TODO: <TASK_NAME>` to remind the future you what needs to be done.

- Place your commits inside a branch based on branch-models (`feature/*`, `bugfix/*`, ...etc). These logical descriptions help readability of commit history and traceability.

## CI - VCS, Build, Test, Deploy (Future Plans)

Currently, this project uses circleci to do simple checks to make sure my code is formatted according to prescribed tslint rules.
Prettier is also used to enforce on-save formatting to avoid lint errors after shipping.

Upon every Pull-request merge, CI will also run `TsDoc` library to generate automated documentation for the annotated artifacts of the app.

Due to time constraints and my lack of familiarity with NGRX testing, written spec tests were minimal.
