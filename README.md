# Description

- A sessionless Hangman App created with Angular + NGRX
- A simple Express App to serve HTTP requests for fetching hangman word list

# Working with the Hangman App:

## Development Lifecycle

To work on the app directly, you will need to run the angular cli `ng serve` for a dev server in addition to starting the Express App. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

To have tests run during development, run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
If you are writing new test files, follow file-naming convention `<FILENAME>.spec.ts`.

## Coding Guidelines

- For any work that needs to be deferred, use syntax `TODO: <TASK_NAME>` to remind the future you what needs to be done.

- Place your commits inside your branch based on branch-models (`feature/*`, `bugfix/*`, ...etc). These logical descriptions help readability of commit history and traceability.

## CI - VCS, Build, Test, Deploy

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Upon every Pull-request merge, CI will also run `TsDoc` library to generate automated documentation for the annotated artifacts of the app.

---

_This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21._
