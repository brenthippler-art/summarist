"use client";

import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { openAuthModal } from "@/lib/redux/slices/modalSlice";
import SubscriptionStatus from "@/components/settings/SubscriptionStatus";
import EmailDisplay from "@/components/settings/EmailDisplay";

export default function SettingsPage() {
  const uid = useAppSelector((state) => state.auth.uid);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-navy mb-4 pb-4 border-b border-gray-200">
        Settings
      </h1>

      {!uid ? (
        <div className="w-[460px] h-[402px] mx-auto flex flex-col items-center justify-between py-6">
          <div className="relative flex-1 w-full">
            <Image
              src="/login.png"
              alt="Login required"
              fill
              className="object-contain"
              sizes="460px"
            />
          </div>
          <p className="font-bold text-brand-navy text-2xl pb-4">
            Log in to your account to see your details.
          </p>
          <button
            type="button"
            onClick={() => dispatch(openAuthModal("login"))}
            className="btn max-w-[200px]"
          >
            Login
          </button>
        </div>
      ) : (
        <>
          <SubscriptionStatus />
          <EmailDisplay />
        </>
      )}
    </div>
  );
}
