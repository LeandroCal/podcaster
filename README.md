# Podcast Application

This project is a podcast application with three views:

- A homepage displaying a list of podcasts.
- A podcast detail page that shows detailed information about a selected podcast along with a list of its episodes.
- An episode detail page that shows information about a selected episode.

## Install Dependencies

After downloading the project, the first step is to install the dependencies by running:

```bash
npm install
```

## Environment Setup

Rename the `.env.example` file to `.env` to use environment variables properly.

## Available Scripts

In the project directory, you can run the following commands:

```bash
npm start
```

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Production-Like Mode

To simulate how the application would look in production mode, modify the `GENERATE_SOURCEMAP` environment variable by setting it to `false`.

Alternatively, you can build the app for production using the following command:

```bash
npm run build
```

This will build the app for production into the `build` folder. The build is optimized, and the filenames are hashed.

To serve the production build locally, you can use the `serve` package by installing it globally:

```bash
npm install -g serve
serve -s build
```

Or use `npx` to run `serve` without global installation:

```bash
npx serve -s build
```

## Linting and Formatting

You can check your code for linting errors using:

```bash
npm run lint
```

To apply formatting defined in Prettier, run:

```bash
npm run format
```

## Testing

### Unit test

```bash
npm test
```

Launches the test runner in interactive watch mode.

```bash
npm run test:coverage
```

Runs the tests and generates a code coverage report. After the tests finish, it will open the coverage report in your default browser.

### E2E test

This project uses [Cypress](https://www.cypress.io/) for end-to-end testing. Cypress is a fast, easy-to-use, and powerful tool for testing modern web applications.

To run the Cypress tests, use the following command:

```bash
npm run cy:open
```

## Eject

```bash
npm run eject
```

**Note: This is a one-way operation. Once you `eject`, you cannot go back!**

If you want full control over the build configurations (Webpack, Babel, ESLint, etc.), you can run `npm run eject`. This will copy all configuration files and dependencies into your project, allowing you to customize them as needed.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn more about React, check out the [React documentation](https://reactjs.org/).
