import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { MetamaskService } from './services/authentication/metamask.service';
import { FirebaseService } from './services/authentication/firebase.service';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let metamaskService: MetamaskService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppComponent
      ],
      providers: [
        FirebaseService,
        provideRouter(routes, withComponentInputBinding()), 
      ],
      declarations: [
        
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



// describe('AppComponent', () => {
//   let component: AppComponent;
//   let fixture: ComponentFixture<AppComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         provideRouter,
//         MatMenuModule,
//         MatIconModule,
//         MatButtonModule,
//         MetamaskService, FirebaseService,         
//         importProvidersFrom([
//         AngularFireModule.initializeApp(environment.firebase),
//         AngularFireAuthModule,
//         AngularFireModule,
//         AngularFirestoreModule,
//         AppComponent
//         ])
//       ],
//       declarations: []
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(AppComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('Teste 1 - should create the app', () => {
//     expect(component).toBeTruthy();
//   });

//   // it('Test 2 - should call metamaskButton method', () => {
//   //   spyOn(component, 'metamaskButton');
//   //   const button = fixture.debugElement.nativeElement.querySelector('button');
//   //   button.click();
//   //   expect(component.metamaskButton).toHaveBeenCalled();
//   // });

//   // it('Test 3 - should display the menu button when textButton length is 11', () => {
//   //   component.textButton = 'MetamaskConnected'; // 17 characters
//   //   fixture.detectChanges();
//   //   const menuButton = fixture.debugElement.nativeElement.querySelector('button[matMenuTriggerFor]');
//   //   expect(menuButton).toBeTruthy();
//   // });

//   // it('Test 4 - should render title in a h1 tag', () => {
//   //   const compiled = fixture.debugElement.nativeElement;
//   //   expect(compiled.querySelector('h1').textContent).toContain('ZUCKER');
//   // });

//   // it('Teste 5 - should have correct classes on nav element', () => {
//   //   const navElement = fixture.debugElement.nativeElement.querySelector('nav');
//   //   expect(navElement.classList).toContain('bg-primary');
//   //   expect(navElement.classList).toContain('text-white');
//   // });

// });