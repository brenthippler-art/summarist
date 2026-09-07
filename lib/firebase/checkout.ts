import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface CreateCheckoutSessionOptions {
  uid: string;
  priceId: string;
  trialDays?: number;
}

export function createCheckoutSession({
  uid,
  priceId,
  trialDays,
}: CreateCheckoutSessionOptions): Promise<string> {
  return new Promise((resolve, reject) => {
    const checkoutSessionRef = collection(
      db,
      "customers",
      uid,
      "checkout_sessions"
    );

    addDoc(checkoutSessionRef, {
      price: priceId,
      success_url: window.location.origin + "/for-you",
      cancel_url: window.location.origin + "/choose-plan",
      ...(trialDays ? { trial_period_days: trialDays } : {}),
      created: serverTimestamp(),
    }).then((docRef) => {
      const unsubscribe = onSnapshot(docRef, (snap) => {
        const data = snap.data();
        if (data?.error) {
          unsubscribe();
          reject(new Error(data.error.message));
        }
        if (data?.url) {
          unsubscribe();
          resolve(data.url);
        }
      });
    });
  });
}