import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { User } from '../models/user.interface';

const usersCollection = 'users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore) { }

  googleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.signInWithPopup(provider).then(result => {
      console.log(result.user);
      this.setUserData(result.user);
    });
  }

  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`${usersCollection}/${user.uid}`);
    const userData: User = {
      email: user.email,
      name: user.displayName,
      photo: user.photoURL
    }
    return userRef.set(userData, {
      merge: true
    })
  }
}
