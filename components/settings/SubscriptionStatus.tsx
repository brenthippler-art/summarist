"use client";

import Link from "next/link";
import { useAppSelector } from "@/lib/redux/hooks";

const PLAN_LABELS: Record<string, string> = {
  monthly: "Premium",
  yearly: "Premium Plus",
};

export default function SubscriptionStatus() {
  const isSubscribed = useAppSelector((state) => state.auth.isSubscribed);
  const planKey = useAppSelector((state) => state.auth.planKey);

  const planLabel = isSubscribed && planKey ? PLAN_LABELS[planKey] : "Basic";

  return (
    <div className="py-6 border-b border-gray-200">
      <h2 className="font-bold text-[#032b41] mb-2">Your Subscription plan</h2>
      <p className="text-[#032b41] mb-4">{planLabel}</p>
      {!isSubscribed && (
        <Link href="/choose-plan" className="btn max-w-[220px] inline-flex">
          Upgrade to Premium
        </Link>
      )}
    </div>
  );
}