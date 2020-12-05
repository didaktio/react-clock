# React Clock

A simple React clock utilising:
* [TypeScript](https://create-react-app.dev/docs/adding-typescript/)
* [SCSS](https://sass-lang.com/)
* [Hooks](https://reactjs.org/docs/hooks-intro.html)
* ['State Lifting'](https://reactjs.org/docs/lifting-state-up.html)
* [Functional Components](https://reactjs.org/docs/components-and-props.html)
* BEM [(Block, Element, Modifier)](https://en.bem.info/methodology/quick-start/) approach
* [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
* Popovers
* Extending [Synthetic Event](https://reactjs.org/docs/events.html) to ensure solid typing.
* Performance optimisations:
    - Memoization with `useMemo` (see buttons function in Clock component).
    - Event handler functions defined outside html to avoid re-rendering of same functions (see Clock component).
    - Single event listener for multiple target children, making use of JavaScript instead of browser overhead
     (see Buttons component in `Clock.tsx`).

**LIVE**: https://react-clock.didakt.io

## Overkill Manual
* **Start**: Click the `Start` button.
* **Stop**: Click the `Stop` button.
* **Reset**: Click the `Reset`button.
* **Speed**: Click the React logo to open a popover from which you can select a different speed.
* **Format**: Click the time to open a popover from which you can select a different format.
* **Save**: No need; progress is saved automatically. You can close the tab, quit the browser, turn off your device &mdash; just navigate back and you'll be right where you left off!

## Getting Started
1) Clone or download the repo into a fresh folder on your machine with `git clone https://github.com/didaktio/react-clock.git`.
2) Run `npm install` from the project root to install dependencies.
3) Run `npm start` to start the development server.
4) Edit/break/improve/add to the code, starting with the `App.tsx` file. Try some of the below TODOs.

#### TODO(?)
* Countdowns
* Testing with [Cypress](https://www.cypress.io/)
* Option to change increment
