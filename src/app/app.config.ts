import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

// One static page: no router, prerendered to HTML and hydrated in the browser.
export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideClientHydration(withEventReplay())],
};
