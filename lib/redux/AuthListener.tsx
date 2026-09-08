"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAppDispatch } from "./hooks";
import { setUser, clearUser, setSubscriptionStatus } from "./slices/authSlice";
import { PLANS } from "@/lib/stripe/plans";

const GUEST_EMAIL = "guest@gmail.com";

export default function AuthListener() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let unsubscribeSubscription: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (unsubscribeSubscription) unsubscribeSubscription();

      if (user) {
        dispatch(setUser({ uid: user.uid, email: user.email ?? "" }));

        if (user.email === GUEST_EMAIL) {
          // Guest is a demo account — always treated as top-tier subscribed
          dispatch(
            setSubscriptionStatus({ isSubscribed: true, planKey: "yearly" }),
          );
        } else {
          const subsRef = collection(
            db,
            "customers",
            user.uid,
            "subscriptions",
          );
          const activeSubsQuery = query(
            subsRef,
            where("status", "in", ["trialing", "active"]),
          );

          unsubscribeSubscription = onSnapshot(activeSubsQuery, (snapshot) => {
            if (snapshot.empty) {
              dispatch(
                setSubscriptionStatus({ isSubscribed: false, planKey: null }),
              );
              return;
            }

            const sub = snapshot.docs[0].data();
            const priceRef = sub.items?.[0]?.price;
            const priceId: string | undefined = priceRef?.id;

            const planKey =
              priceId === PLANS.yearly.priceId
                ? "yearly"
                : priceId === PLANS.monthly.priceId
                  ? "monthly"
                  : null;

            dispatch(setSubscriptionStatus({ isSubscribed: true, planKey }));
          });
        }
      } else {
        dispatch(clearUser());
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSubscription) unsubscribeSubscription();
    };
  }, [dispatch]);

  return null;
}
