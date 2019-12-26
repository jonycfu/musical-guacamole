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

# Getting Started

## Development Lifecycle

After installing your dependencies (`npm i`), there are three necessary steps:

1. First, serve your express-api-server, run `npm run api`

2. To work on the app directly, you will need to run `npm start`, which is modified for serving the Angular app which calls api calls from the Express App. Navigate to `http://localhost:4200/`.

3. To have tests run during development, run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). Newly added modules/files/dependencies may require a process restart.

## Coding Guidelines

- For most file names, use Angular's file-naming convention `<FILENAME>.<GROUP_TYPE>.ts` (e.g. `app.module.ts`, `word-api.service.ts`)

- For any work that needs to be deferred, use syntax `TODO: <TASK_NAME>` to remind the future you what needs to be done.

- Place your commits inside a branch based on branch-models (`feature/*`, `bugfix/*`, ...etc). These logical descriptions help readability of commit history and traceability.

## CI - VCS, Build, Test, Deploy

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Upon every Pull-request merge, CI will also run `TsDoc` library to generate automated documentation for the annotated artifacts of the app.

---

_This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21._
