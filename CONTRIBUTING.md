# Contributing

Thanks for your willingness to contribute. It takes a lot of courage to even visit this section. I sincerely appreciate it. Please follow the guidelines in this document to get you started with the repo and codebase.

## Issues and Pull Request

Make sure to do a quick search on the closed issues before opening a new issue or a pull request. We have discussed about a few topics already so you may find your answer in some of the issues. 

I love to get feature requests or bug fixes in the PRs, but **please open an issue first before opening the pull request.** This will allow me to assess the work needed to fulfill the request or fix the bug.

No format is required for branch name or commit messages, I personally don't think that's relevant in any way. Your contribution is very valuable and will be taken into account in whatever shape it comes.

## Codebase architecture

The codebase is written in TypeScript so you will need at least a bit of familiriaty with the language. This library implements the MVC pattern in the following way:

- `notyf.ts`: The Controller. Exposes the main API and manages the creation and destruction of the entities (toasts).
- `notyf.model.ts`: The Model. Represents the state of a Notyf instance by storing the array of active toasts.
- `notyf.view.ts`: The View. Interacts with the DOM to create and destroy the toasts elements.

## Tests

Ensure that all tests are passing before opening the pull request. To do this, run `npm run test:dev` and then click on `notyf_spec.js` to run the suite.

You'll also need to add unit tests for the features or fixes implemented in your PR. Don't be discouraged by this if you don't feel confident about it. Just open the PR and I will guide you through the process of creating tests for it.

## Development

I haven't set up a good hot reload strategy yet so the dev experience is not great now. Follow the next steps to spin up and test the project locally:

1. Fork the repo
2. Clone the repo `git clone <your-fork-url>`
3. Install dependencies: `npm i`
4. Run the dev server: `npm run dev`
5. Open the browser at `localhost:8080`
6. Play with the UI controls and the code at `demo/scripts/script-demo.js`. That's your playground to try new configurations or features.
7. Edit the source code within `/src`
8. Compile: `npm run build`. This will output a new minified bundle; lite-server will listen and refresh the browser.
9. Go to step 5.
