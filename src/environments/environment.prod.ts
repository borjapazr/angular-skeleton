// eslint-disable-next-line no-restricted-imports
import packageJson from '../../package.json';

export const environment = {
  production: true,
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
