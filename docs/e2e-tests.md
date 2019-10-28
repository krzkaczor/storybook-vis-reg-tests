# E2E Tests

We use `Cypress` to write e2e tests.

## Writing new tests

You need to have app running locally. Development setup will do.

To open cypress type: `yarn test:e2e:dev`. To write new create file named `feature.spec.e2e.ts`. Tu
run e2e against running frontend do `yarn test:e2e:cypress`.

## Inspecting failed tests on CI

Go to [Cypress Dashboard](https://dashboard.cypress.io/#/projects/y5m5cy/runs) to see failed test
artifacts.
