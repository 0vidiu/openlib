# OpenLib

[![Build Status](https://travis-ci.org/0vidiu/openlib.svg?branch=master)](https://travis-ci.org/0vidiu/openlib) [![codecov](https://codecov.io/gh/0vidiu/openlib/branch/master/graph/badge.svg)](https://codecov.io/gh/0vidiu/openlib) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## A custom boilerplate for creating open source libraries
This package was created to facilitate the first steps in creating a new project. It uses **Typescript** to write less error-prone code, **ESLint** and **TSLint** to ensure more reliable and readable code, **Webpack** for bundling multiple versions, **gHooks** to validate each commit, **Commitizen** to ensure a good commit naming convention, **Travis-CI** for build testing, **Semantic-release** for automatically publishing your project and generating changelogs.

### Prerequisites
* Setup a [Travis-CI](https://travis-ci.org) account
* Setup a [CodeCov](https://codecov.io) account

## Getting started
```sh
# Create new project
git clone https://github.com/0vidiu/openlib.git ./<dir-name>
cd <dir-name>

# Set up git for your new project
rm -rf .git
git init
git remote add origin git@github.com:<your-username>/<your-repo>.git

# Install dependencies
yarn

# Run tests and build tasks
yarn validate

# Start writing something awesome
yarn dev
```
## yarn/npm scripts
```sh
# git commit using commitizen cli
yarn commit

# start build tool in watch mode
yarn dev

# run tests
yarn test

# lint *.js files
yarn lint:js

# lint *.ts files
yarn lint:ts

# lint everything
yarn lint

# build for prodution
yarn build

# runs lint, test and build tasks
yarn validate
```

## When you're ready to deploy
```sh
# Setup up semantic-release
sudo yarn global add semantic-release-cli
semantic-release-cli setup

# Edit .travis.yml and uncomment following line
# to enable semantic-release after Travis build success:
# - yarn travis-deploy-once "yarn semantic-release"
vim .travis.yml
```
