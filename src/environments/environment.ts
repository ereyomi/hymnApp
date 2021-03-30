// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  admin: true,
  appVersion: require('./../../package.json').version,
  supaBaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxMjk3NjQ0MywiZXhwIjoxOTI4NTUyNDQzfQ.npPzB4XrvyKcOljn0Ug_byywg_OUscfFMBL3jHUoMUg',
  supaBaseUrl: 'https://nqcfzgrghrcefzynlcxx.supabase.co',
  supaBaseServiceKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjEyOTc2NDQzLCJleHAiOjE5Mjg1NTI0NDN9.km17M7KCTMcz41laQvp0tJIagnNDpFGgzqMufWlp19s',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
