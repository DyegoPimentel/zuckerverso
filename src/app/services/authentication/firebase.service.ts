import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import 'firebase/compat/firestore'; 
import { BehaviorSubject, Observable, from, map } from 'rxjs';

export interface User {
  favorites: string[]
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private userSubject = new BehaviorSubject<User>({} as User);
  public user$ = this.userSubject.asObservable();
  
  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) {}

  async loginAnonimo() {
    try {
      const userCredential = await this.afAuth.signInAnonymously();
      const user = userCredential.user;
    } catch (error) {
      console.error('Erro ao entrar no modo anônimo:', error);
    }
  }

  addUser(token: string, user: User): Promise<void> {
    return this.firestore.collection('users').doc(token).set(user);
  }

  updateUser(token: string, user: User): Promise<void> {
    return this.firestore.collection('users').doc(token).update(user);
  }

  getUsers(): Observable<User[]> {
    return this.firestore.collection('users').valueChanges().pipe(
      map(users => users as User[]));
  }

  getUserById(token:string): Observable<User> {
    return this.firestore.collection('users').doc(token)
    .valueChanges().pipe(map(user => user as User));
  }

  setUserLocal(user: User): void {
    this.userSubject.next(user);
  }

  auth(): void {
    console.log("Auth");
  }
}
