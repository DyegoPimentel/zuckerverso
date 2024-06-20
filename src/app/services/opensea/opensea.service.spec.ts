import { TestBed } from '@angular/core/testing';

import { OpenseaService } from './opensea.service';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { importProvidersFrom } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { MetamaskService } from '../authentication/metamask.service';
import { environment } from '../../../environments/environment';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('OpenseaService', () => {
  let service: OpenseaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        
      ],
      providers: [
        MetamaskService, 
        provideHttpClient(withInterceptorsFromDi()),
        importProvidersFrom([
          AngularFireModule.initializeApp(environment.firebase),
          AngularFireAuthModule,
          AngularFireModule,
          AngularFirestoreModule
          ])
      ]
    });
    service = TestBed.inject(OpenseaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
