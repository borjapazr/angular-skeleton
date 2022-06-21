import 'zone.js/dist/zone-node';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as domino from 'domino';
import * as dotEnvConfig from 'dotenv-defaults/config';
import * as dotenvExpand from 'dotenv-expand';
import endent from 'endent';
import express, { Express } from 'express';
import figlet from 'figlet';
import standard from 'figlet/importable-fonts/Standard';
import { existsSync, readFileSync } from 'fs';
import { ISRHandler } from 'ngx-isr';
import fetch from 'node-fetch';
import { join } from 'path';

import { Logger } from '@core/services/logger.service';
import { environment } from '@env/environment';

dotenvExpand.expand(dotEnvConfig);

const LOGGER = new Logger('server');

const PORT = process.env['PORT'] || 4000;
const ISR_TOKEN = process.env['ISR_TOKEN'] || 'angular-skeleton';
const DIST_FOLDER = join(process.cwd(), 'dist/browser');
const INDEX_HTML = existsSync(join(DIST_FOLDER, 'index.original.html')) ? 'index.original.html' : 'index';
const TEMPLATE = readFileSync(join(DIST_FOLDER, 'index.html')).toString();

/**
 * window and document polyfills
 */
// Server-side DOM implementation
const window: any = domino.createWindow(TEMPLATE);
window.Object = Object;
window.Math = Math;
window.fetch = fetch;

// Browser objects abstractions
(global as any).window = window;
Object.defineProperty(window.document.body.style, 'transform', {
  value: () => {
    return {
      configurable: true,
      enumerable: true
    };
  }
});
(global as any).document = window.document;
(global as any).HTMLElement = window.HTMLElement;
(global as any).HTMLElement.prototype.getBoundingClientRect = () => {
  return {
    left: '',
    right: '',
    top: '',
    bottom: ''
  };
};

// Other optional depending on application configuration
(global as any).object = window.object;
(global as any).navigator = window.navigator;
(global as any).localStorage = window.localStorage;
(global as any).sessionStorage = window.sessionStorage;
(global as any).DOMTokenList = window.DOMTokenList;

// eslint-disable-next-line import/first
import { AppServerModule } from './src/main.server';

const app = (): Express => {
  const server = express();

  server.use(compression());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser());

  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule
    })
  );
  server.set('view engine', 'html');
  server.set('views', DIST_FOLDER);

  // Health check
  server.get('/healthz', (_req, res) =>
    res.json({
      status: 'ALIVE',
      message: `🚀 To infinity and beyond!`
    })
  );

  // Invalidate cached routes
  server.get('/invalidate', async (req, res) => await isr.invalidate(req, res));

  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(DIST_FOLDER, {
      maxAge: '1y'
    })
  );

  // All regular routes use the ISR Handler
  const isr = new ISRHandler({
    indexHtml: INDEX_HTML,
    invalidateSecretToken: ISR_TOKEN,
    enableLogging: !environment.production
  });

  server.get(
    '*',
    (req, _, next) => {
      (global as any).navigator = { userAgent: req['headers']['user-agent'] } as Navigator;
      next();
    },
    // Serve page if it exists in cache
    async (req, res, next) => await isr.serveFromCache(req, res, next),
    // Server side render the page and add to cache if needed
    async (req, res, next) =>
      await isr.render(req, res, next, {
        providers: [
          { provide: APP_BASE_HREF, useValue: req.baseUrl },
          { provide: REQUEST, useValue: req },
          { provide: RESPONSE, useValue: res }
        ]
      })
  );

  return server;
};

const run = (): void => {
  app().listen(PORT, () => showBanner());
};

const showBanner = (): void => {
  figlet.parseFont('Standard', standard);

  const banner = endent`Application started successfully!
     ${figlet.textSync(environment.appName)}
      Name: 🧱 ${environment.appName}
      Description: 📖 ${environment.appDescription}
      Port: ${PORT}
      Base Path: /
      Environment: ${environment.production ? 'production' : 'development'}
      Author: ${environment.author}
      Email: ${environment.authorEmail}
      Website: ${environment.authorWebsite}
      Copyright © ${new Date().getFullYear()} ${environment.author}. All rights reserved.
    `;
  LOGGER.info(banner);
};

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
// eslint-disable-next-line no-undef
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export { app };
export * from './src/main.server';
