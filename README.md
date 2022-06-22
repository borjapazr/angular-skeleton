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

- Angular
- TailwindCSS
- Angular Universal
- domino
- ng-lazyload-image
- ngx-isr
- Jest
- ESLint
- Prettier
- Husky
- Stylelint
- HTMLHint
- CSpell
- Commitlint
- Cypress
- Transloco
- cz
- lint-staged
- jest-extended

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

- Prettier
- ESLint
- Stylelint
- HTMLHint
- commitlint

### 🛢 Barrel files

### 🏞 Application layout

- Flexbox layout
- TailwindCSS
- Dark theme
- Styles (SCSS) folder structure

### 🌐 Internationalization (i18n)

- Transloco
- Route language prefixing

### 🏎 Server Side Rendering (SSR) and Incremental Static Rendering (ISR)

- Angular Universal
- Domino
- ngx-isr

### 📇 Prerendering

- Angular Universal

### 📈 SEO

- CustomPageTitleStrategy

### 🔰 Progressive Web Application (PWA)

- Service Worker configuration
- Stale while revalidate strategy
- Offline support

### 🌠 Image lazy-loading

- ng-lazyload-image

### 💨 Module preloading strategies

- NoPreloading (default)
- PreloadAllModules
- CustomRoutePreloadStrategy (implemented in this repository)
- NetworkAwareRoutePreloadingStrategy (implemented in this repository)
- HoverPreloadStrategy (ngx-hover-preload)
- QuicklinkStrategy (ngx-quicklink)

### 🛣 Route reusability

- RouteReuseStrategy

### 🏒 Pipes

### 🧪 Testing

#### Unit and integration tests

- Jest
- jest-extended

#### e2e tests

- Cypress

### 🐐 Makefile rules

The main actions on this project are managed using a [Makefile](Makefile) as an entrypoint.

TODO

### ⚡ Scripts

[package.json](package.json) scripts:

TODO

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
