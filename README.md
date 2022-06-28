<div align="center">
 <img
  width="500"
 alt="Node.js, Typescript and Express template"
 src="https://i.imgur.com/ysaMVxF.png">
<br>
<img
  width="500"
 alt="Node.js, Typescript and Express template"
 src="https://i.imgur.com/LydboRD.png">
 
<br>

![GitHub package.json version](https://img.shields.io/github/package-json/v/borjapazr/angular-skeleton?style=flat-square)
![GitHub CI Workflow Status](https://img.shields.io/github/workflow/status/borjapazr/angular-skeleton/CI?style=flat-square&logo=github&label=CI)
![GitHub CD Workflow Status](https://img.shields.io/github/workflow/status/borjapazr/angular-skeleton/CD?style=flat-square&logo=github&label=CD)
![GitHub LICENSE](https://img.shields.io/github/license/borjapazr/angular-skeleton?style=flat-square)
[![Demo](https://img.shields.io/badge/demo-🎮-yellow.svg?style=flat-square)](https://angular-skeleton.marsmachine.space/)
[![Documentation](https://img.shields.io/badge/documentation-80%25-orange?style=flat-square)](https://img.shields.io/badge/documentation-80%25-orange?style=flat-square)

<h4>
  🅰️🦸 Production-ready template for Progressive Web Applications implemented with Angular, TailwindCSS, Transloco, ngx-isr, etc.
</h4>

<a href="#ℹ️-about">ℹ️ About</a> •
<a href="#-features">📋 Features</a> •
<a href="#-contributing"> 🤝 Contributing</a> •
<a href="#️-roadmap"> 🛣️ Roadmap</a> •
<a href="#-credits">🎯 Credits</a> •
<a href="#-license">🚩 License</a>

</div>

---

## ℹ️ About

The main goal of this project is to provide a base template for the generation of a production-ready web application made with `Angular`. The idea is to avoid having to configure all the tools involved in a project every time it is started and thus be able to focus on the definition and implementation of the business logic.

> 📣 This is an opinionated template. The architecture of the code base and the configuration of the different tools used has been based on best practices and personal preferences.

### 🚀 Quick start

- Start project in development mode:

  ```bash
  npm run start:dev
  ```

- Start project in production mode:

  ```bash
  npm run start:prod
  ```

## 📋 Features

- [Angular](https://angular.io/): Angular is a platform for building mobile and desktop web applications.
- [Angular Universal](https://angular.io/guide/universal): Server-side rendering (SSR) with Angular Universal.
- [TailwindCSS](https://tailwindcss.com/): A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.
- [ng-lazyload-image](https://www.npmjs.com/package/ng-lazyload-image): A super small libary for lazy loading images for Angular apps with zero dependencies
- [ngx-isr](https://www.npmjs.com/package/ngx-isr): Incremental Static Regeneration (ISR) enables developers and content editors to use static-generation on a per-page basis, without needing to rebuild the entire site. With ISR, you can retain the benefits of static while scaling to millions of pages.
- i18n using [Transloco](https://ngneat.github.io/transloco/)
- Unit tests using [Jest](https://github.com/facebook/jest)
- e2e tests using [Cypress](https://www.cypress.io/)
- [Spell check](https://github.com/streetsidesoftware/cspell)
- Linting with [ESLint](https://github.com/eslint/eslint)
- Formatting with [Prettier](https://github.com/prettier/prettier)
- [Stylelint](https://stylelint.io/): A mighty, modern linter that helps you avoid errors and enforce conventions in your styles.
- [HTMLHint](https://htmlhint.com/): A linter for HTML that helps you avoid errors and enforce conventions in your HTML.
- Commit messages must meet conventional commits format
- Git hooks with [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)
- Containerised using [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- GitHub Actions
- Makefile as project entrypoint
- A lot of emojis 🛸

### 🗂 Codebase structure

```txt
angular-skeleton/
├── .github/
├── .husky/
├── .vscode/
├── cypress/
│   ├── e2e/
│   ├── fixtures/
│   ├── support/
│   ├── coverage.webpack.js
│   └── tsconfig.json
├── docker/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── components/
│   │   │   ├── constants/
│   │   │   ├── enums/
│   │   │   ├── guards/
│   │   │   ├── handlers/
│   │   │   ├── interceptors/
│   │   │   ├── loaders/
│   │   │   ├── models/
│   │   │   ├── resolvers/
│   │   │   ├── services/
│   │   │   ├── strategies/
│   │   │   ├── tokens/
│   │   │   ├── utils/
│   │   │   ├── ...
│   │   │   └── core.module.ts
│   │   ├── features
│   │   │   ├── feature-a
│   │   │   │   ├── components/
│   │   │   │   ├── models/
│   │   │   │   ├── pages/
│   │   │   │   ├── services/
│   │   │   │   ├── ...
│   │   │   │   ├── home-routing.module.ts
│   │   │   │   └── home.module.ts
│   │   │   ├── feature-b
│   │   │   └── ...
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   ├── directives/
│   │   │   ├── modules/
│   │   │   ├── pipes/
│   │   │   ├── services/
│   │   │   └── shared.module.ts
│   │   ├── app-routing.module.ts
│   │   ├── app.browser.module.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   └── app.server.module.ts
│   ├── assets/
│   │   ├── i18n/
│   │   ├── icons/
│   │   └── images/
│   ├── environments/
│   ├── styles/
│   │   ├── abstracts/
│   │   ├── base/
│   │   ├── components/
│   │   ├── layout/
│   │   ├── vendors/
│   │   └── main.scss
│   ├── types/
│   ├── favicon.ico
│   ├── favicon.png
│   ├── index.html
│   ├── jest.mocks.ts
│   ├── jest.setup.ts
│   ├── main.browser.ts
│   ├── main.server.ts
│   ├── manifest.webmanifest
│   ├── polyfills.ts
│   ├── robots.txt
│   └── styles.scss
├── .browserslistrc
├── .commitlintrc.js
├── .cspell.json
├── .czrc
├── .dockerignore
├── .editorconfig
├── .env
├── .eslintcache
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .htmlhintrc
├── .lintstagedrc.js
├── .ncurc.js
├── .npmignore
├── .prettierignore
├── .prettierrc.js
├── .stylelintcache
├── .stylelintignore
├── .tool-versions
├── .versionrc.js
├── CHANGELOG.md
├── LICENSE
├── Makefile
├── README.md
├── TODO.md
├── angular.json
├── cypress.config.ts
├── jest.config.js
├── ngsw-config.json
├── nyc.config.js
├── package-lock.json
├── package.json
├── routes.txt
├── server.ts
├── stylelint.config.js
├── tailwind.config.js
├── transloco.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.server.json
└── tsconfig.spec.json
```

### 🎛️ Code style and best practices

> ⚠️ This section has yet to be fully documented.

- Prettier
- ESLint
- Stylelint
- HTMLHint
- commitlint

### 🛢 Barrel files

Barrel files are used to organize exports. This significantly reduces the size of the import blocks.

### 🏞 Application layout

> ⚠️ This section has yet to be fully documented.

- Flexbox layout
- TailwindCSS
- Dark theme
- Styles (SCSS) folder structure

### 🌐 Internationalization (i18n)

> ⚠️ This section has yet to be fully documented.

- Transloco
- Route language prefixing

### 🏎 Server Side Rendering (SSR) and Incremental Static Rendering (ISR)

> ⚠️ This section has yet to be fully documented.

- Angular Universal
- Domino
- ngx-isr

### 📇 Prerendering

> ⚠️ This section has yet to be fully documented.

- Angular Universal

### 📈 SEO

> ⚠️ This section has yet to be fully documented.

- CustomPageTitleStrategy

### 🔰 Progressive Web Application (PWA)

> ⚠️ This section has yet to be fully documented.

- Service Worker configuration
- Stale while revalidate strategy
- Offline support

### 🌠 Image lazy-loading

> ⚠️ This section has yet to be fully documented.

- ng-lazyload-image

### 💨 Module preloading strategies

> ⚠️ This section has yet to be fully documented.

- [NoPreloading](https://angular.io/api/router/NoPreloading) (default)
- [PreloadAllModules](https://angular.io/api/router/PreloadAllModules)
- [CustomRoutePreloadStrategy](src/app/core/strategies/custom-route-preload.strategy.ts)
- [NetworkAwareRoutePreloadingStrategy](src/app/core/strategies/network-aware-route-preload.strategy.ts)
- [HoverPreloadStrategy](https://github.com/mgechev/ngx-hover-preload/blob/master/projects/ngx-hover-preload/src/lib/hover-preload.strategy.ts)
- [QuicklinkStrategy](https://github.com/mgechev/ngx-quicklink/blob/master/src/quicklink-strategy.service.ts)

### 🛣 Route reusability

- RouteReuseStrategy

### 🏒 Pipes

> ⚠️ This section has yet to be fully documented.

### 🧪 Testing

> ⚠️ This section has yet to be fully documented.

#### Unit and integration tests

- Jest
- jest-extended

#### e2e tests

- Cypress

### 🐐 Makefile rules

The main actions on this project are managed using a [Makefile](Makefile) as an entrypoint.

```bash
Usage: make TARGET [ARGUMENTS]

Targets:
  build/csr                 Build csr image
  build/ssr                 Build ssr image
  clean/csr                 Clean CSR application
  clean/ssr                 Clean SSR application
  help                      Show this help
  start/csr                 Start application in Client Side Rendering mode
  start/ssr                 Start application in Server Side Rendering mode
  stop/csr                  Stop application in Client Side Rendering mode
  stop/ssr                  Stop application in Server Side Rendering mode
```

### ⚡ Scripts

[package.json](package.json) scripts:

```json
  ...
  "scripts": {
    "start:dev": "ng serve --configuration development --port 4200 --open",
    "start:prod": "ng serve --configuration production --port 4300 --open",
    "start:ssr:dev": "ng run angular-skeleton:serve-ssr:development --port 4201 --open",
    "start:ssr:prod": "ng run angular-skeleton:serve-ssr:production --port 4301 --open",
    "build:dev": "rimraf dist && ng build --configuration development",
    "build:prod": "rimraf dist && ng build --configuration production && npm run build:optimize",
    "build:ssr:dev": "rimraf dist && ng build --configuration development && ng run angular-skeleton:server:development",
    "build:ssr:prod": "rimraf dist && ng build --configuration production && ng run angular-skeleton:server:production && npm run build:optimize",
    "build:prerender:dev": "rimraf dist && ng run angular-skeleton:prerender:development",
    "build:prerender:prod": "rimraf dist && ng run angular-skeleton:prerender:production && npm run build:optimize",
    "build:optimize": "run-s optimize:* && ngsw-config dist/browser ./ngsw-config.json",
    "optimize:i18n": "transloco-optimize dist/browser/assets/i18n",
    "serve:pwa": "http-server -p 4400 -P http://localhost:4400? dist/browser -o",
    "serve:ssr": "node dist/server/main.js",
    "i18n:extract": "transloco-keys-manager extract",
    "i18n:find": "transloco-keys-manager find",
    "check:types": "tsc --pretty --noEmit && tsc --project cypress/tsconfig.json --pretty --noEmit",
    "check:format": "prettier --check .",
    "check:lint": "eslint . --ext .js,.ts --color",
    "check:html": "htmlhint .",
    "check:scss": "stylelint 'src/**/*.{css,scss}' --color",
    "check:spelling": "cspell --config=.cspell.json \"{README.md,TODO.md,.github/*.md,src/**/*.ts,src/**/*.json}\"",
    "check:i18n": "transloco-validator src/assets/i18n/*.json src/assets/i18n/**/*.json",
    "check:staged": "lint-staged",
    "fix:format": "prettier --check --write --ignore-unknown .",
    "fix:lint": "npm run check:lint -- --fix",
    "fix:scss": "npm run check:scss -- --fix",
    "test": "cross-env NODE_ENV=test jest --verbose --colors --runInBand",
    "test:spec": "npm run test -- --testPathPattern=spec",
    "test:unit": "npm run test -- --testPathPattern=unit",
    "test:int": "npm run test -- --testPathPattern=integration",
    "e2e": "ng e2e",
    "e2e:run": "ng run angular-skeleton:cypress-run",
    "e2e:open": "ng run angular-skeleton:cypress-open",
    "e2e:coverage:view": "http-server -p 9004 ./coverage-e2e/lcov-report -o",
    "test:watch": "npm run test -- --watch",
    "test:coverage": "npm run test -- --coverage --silent",
    "test:coverage:view": "http-server -p 9003 ./coverage/lcov-report -o",
    "reset-hard": "git clean -dfx && git reset --hard && npm install",
    "version": "standard-version -t",
    "prepare-release": "run-s reset-hard version",
    "commit": "cz",
    "update-deps": "npm-check-updates -u",
    "prepare": "husky install"
  },
  ...
```

## 🤝 Contributing

Just fork and open a pull request. All contributions are welcome 🤗

## 🛣️ Roadmap

Please, check [TODO](TODO.md) for the current roadmap.

## 🎯 Credits

To implement this project I have based myself on many similar projects. There were countless of them and I gave them all a star.

🙏 Thank you very much for these wonderful creations.

### ⭐ Stargazers

[![Stargazers repo roster for @borjapazr/angular-skeleton](https://reporoster.com/stars/borjapazr/angular-skeleton)](https://github.com/borjapazr/angular-skeleton/stargazers)

## 🚩 License

MIT @ [borjapazr](https://bpaz.dev). Please see [License](LICENSE) for more information.
