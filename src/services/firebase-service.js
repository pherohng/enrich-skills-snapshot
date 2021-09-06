import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { FIREBASE_CONFIG } from '../configs';

firebase.initializeApp(FIREBASE_CONFIG);

export const auth = firebase.auth();
const firestore = firebase.firestore();
const userCollection = firestore.collection('users');

export const listenOnAuthStateChanged = (callback) => {
  return auth.onAuthStateChanged(callback);
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('userId');
};

export const signUp = async (requestBody) => {
  const { user } = await auth.createUserWithEmailAndPassword(requestBody.email, requestBody.password);
  await auth.signOut();

  try {
    await userCollection.doc(`${user.uid}`).set({
      uid: user.uid,
      firstName: requestBody.firstName,
      lastName: requestBody.lastName,
      email: user.email,
      avatar: requestBody.avatar
    });
  } catch (error) {
    await user.delete();
  }
};

export const signIn = (requestBody) => {
  return auth.signInWithEmailAndPassword(requestBody.email, requestBody.password);
};

export const signOut = () => {
  return auth.signOut();
};

export const changePassword = async (requestBody) => {
  const currentUser = auth.currentUser;
  const credential = firebase.auth.EmailAuthProvider.credential(currentUser.email, requestBody.currentPassword);
  const { user } = await currentUser.reauthenticateWithCredential(credential);

  await user.updatePassword(requestBody.password);
};

export const sendPasswordResetEmail = (requestBody) => {
  return auth.sendPasswordResetEmail(requestBody);
};

export const verifyPasswordResetCode = (code) => {
  return auth.verifyPasswordResetCode(code);
};

export const resetPassword = (code, newPassword) => {
  return auth.confirmPasswordReset(code, newPassword);
};

export const getUserDetails = (id) => {
  return userCollection.doc(`${id}`).get();
};

export const saveUserDetails = (id, requestBody) => {
  return userCollection.doc(`${id}`).update(requestBody);
};
