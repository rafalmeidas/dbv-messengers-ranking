import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideRouter } from '@angular/router';

import { environment } from '../../environment';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
