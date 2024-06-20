import { ComponentFixture, TestBed } from '@angular/core/testing';

import HomeComponent from "./home.component"
import { MetamaskService } from '../../services/authentication/metamask.service';
import { FirebaseService } from '../../services/authentication/firebase.service';
import { environment } from '../../../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { importProvidersFrom } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent
      ],
      declarations: [],
      providers: [MetamaskService, FirebaseService,         
        importProvidersFrom([
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFireModule,
        AngularFirestoreModule
        ])] // Adicione os serviços necessários
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});