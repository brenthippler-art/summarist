import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

const GUEST_EMAIL = "guest@gmail.com";
const GUEST_PASSWORD = "guest123";

export function registerWithEmail(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function loginWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function loginAsGuest() {
  return signInWithEmailAndPassword(auth, GUEST_EMAIL, GUEST_PASSWORD);
}

export function loginWithGoogle() {
  return signInWithPopup(auth, new GoogleAuthProvider());
}

export function logout() {
  return signOut(auth);
}

export function resetPassword(email: string) {
  return sendPasswordResetEmail(auth, email);
}