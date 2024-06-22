import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import 'firebase/compat/firestore'; 
import { BehaviorSubject, Observable, from, identity, map, of } from 'rxjs';

export interface User {
  favorites: string[]
}

export interface Lore {
  description: string
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private userSubject = new BehaviorSubject<User | undefined>(undefined);
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

  getUserById(token:string | undefined): Observable<User | undefined> {
    if (!token) return of(undefined);
    return this.firestore.collection('users').doc(token)
    .valueChanges().pipe(map(user => user as User));
  }

  getLoreById(identifier: string): Observable<Lore> {
    return this.firestore.collection('lore').doc(identifier)
    .valueChanges().pipe(map(lore => lore as Lore));
  }

  setUserLocal(user: User | undefined): void {
    this.userSubject.next(user);
  }
}
