import { Injectable } from '@angular/core';
import { User } from '../shared/user.interface';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/auth';
import 'firebase/compat/auth';
import {AngularFirestore,AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { Observable, switchMap ,of} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$:Observable<User>;

  constructor(private afAuth:AngularFireAuth,private afs:AngularFirestore) { 
    this.user$=this.afAuth.authState.pipe(
      switchMap((user)=>{
        if(user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    )
  }

  
  async resetPassword(email:string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email)
    } catch (error) {
      console.log(error);
    }
  }
  async loginGoogle(): Promise<User> {
    const auth=firebase.auth();
    const provider=new firebase.auth.GoogleAuthProvider();
    try {
      const { user } = await auth.signInWithPopup(provider);
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async register(email:string,password:string): Promise<User> {
    try {
      const {user}=await this.afAuth.createUserWithEmailAndPassword(email,password);
      await this.sendVerificationEmail()
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async login(email:string,password:string): Promise<User> {
    try {
      const {user}=await this.afAuth.signInWithEmailAndPassword(email,password);
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async sendVerificationEmail(): Promise<void> {
    try {
      return (await this.afAuth.currentUser)?.sendEmailVerification();
    } catch (error) {
      console.log(error);
    }
  }
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  private updateUserData(user:User){
    const userRef:AngularFirestoreDocument<User>=this.afs.doc(`users/${user.uid}`);
    const data:User={
      uid:user.uid,
      email:user.email,
      emailVerified:user.emailVerified,
      displayName:user.displayName,
    }

    return userRef.set(data,{merge:true});
  }
}
