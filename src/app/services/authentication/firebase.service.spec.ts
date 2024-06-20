import { TestBed } from '@angular/core/testing';
import { FirebaseService } from './firebase.service';
import { importProvidersFrom } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      
      ],
      providers: [
        FirebaseService, 
        importProvidersFrom([
          AngularFireModule.initializeApp(environment.firebase),
          AngularFireAuthModule,
          AngularFireModule,
          AngularFirestoreModule
          ])
      ]
    });
    service = TestBed.inject(FirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
