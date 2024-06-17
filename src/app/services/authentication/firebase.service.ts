import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; 
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { Firestore, collection } from 'firebase/firestore';
import { collectionData } from '@angular/fire/firestore';
import { AngularFireList } from '@angular/fire/compat/database';
import { MetamaskService } from './metamask.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private userSubject = new BehaviorSubject<string>('');
  public user$ = this.userSubject.asObservable();
  
  private dbPath = '/users'
  usersRef: AngularFirestoreCollection<any> | undefined;
  
  constructor(
    private _db: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) {

      from(this.loginAnonimo())
      .subscribe({
        next: (res) => {
          console.log('res sub loginanonimo', res);
        }
      })
      this.usersRef = this.firestore.collection('users');
      console.log('fire constructor', this.usersRef);

  }

  async loginAnonimo() {
    try {
      const userCredential = await this.afAuth.signInAnonymously();
      const user = userCredential.user;
      console.log('Usuário autenticado anonimamente:', user);
      // buscar registro do usuário
    } catch (error) {
      console.error('Erro ao entrar no modo anônimo:', error);
    }
  }

  getUserById(tokenMetamask: string): Observable<any> {
    return this.firestore.collection('users').doc(tokenMetamask).valueChanges();
  }

  get firestore() {
    return this._db;
  }

  auth(): void {
    console.log("Auth");
  }
}
