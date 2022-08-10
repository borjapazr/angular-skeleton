// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// eslint-disable-next-line no-restricted-imports
import packageJson from '../../package.json';

export const environment = {
  production: false,
  appName: 'Angular Skeleton',
  appVersion: packageJson.version,
  appDescription: 'Angular Skeleton',
  author: '@borjapazr',
  authorEmail: 'borjapazr@gmail.com',
  authorWebsite: 'https://bpaz.dev',
  defaultLanguage: 'en',
  darkModeAsDefault: false,
  checkForUpdatesInterval: 60,
  baseUrl: 'http://localhost:4200'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
