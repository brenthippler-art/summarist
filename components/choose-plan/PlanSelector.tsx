"use client";

import { useState } from "react";
import { PLANS, PlanKey } from "@/lib/stripe/plans";
import { createCheckoutSession } from "@/lib/firebase/checkout";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { openAuthModal } from "@/lib/redux/slices/modalSlice";

export default function PlanSelector() {
  const [selected, setSelected] = useState<PlanKey>("yearly");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const uid = useAppSelector((state) => state.auth.uid);

  const handleCheckout = async () => {
    if (!uid) {
      dispatch(openAuthModal("login"));
      return;
    }

    setIsLoading(true);
    try {
      const plan = PLANS[selected];
      const url = await createCheckoutSession({
        uid,
        priceId: plan.priceId,
        trialDays: plan.trialDays || undefined,
      });
      window.location.assign(url);
    } catch {
      setIsLoading(false);
      // TODO: surface a real error message to the user
    }
  };

  return (
    <div className="max-w-[680px] mx-auto text-center">
      <h2 className="text-2xl font-bold text-[#032b41] mb-6">
        Choose the plan that fits you
      </h2>

      <div className="flex flex-col gap-4 mb-6">
        {(Object.keys(PLANS) as PlanKey[]).map((key, index) => {
          const plan = PLANS[key];
          const isSelected = selected === key;
          return (
            <div key={key}>
              <button
                type="button"
                onClick={() => setSelected(key)}
                className={`w-full text-left border rounded-lg p-6 bg-[#f1f6f4] ${
                  isSelected ? "border-[#2bd97c] border-2" : "border-gray-300"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? "border-[#032b41]" : "border-gray-400"
                    }`}
                  >
                    {isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#032b41]" />
                    )}
                  </span>
                  <div>
                    <p className="font-bold text-lg text-[#032b41]">{plan.label}</p>
                    <p className="font-bold text-2xl text-[#032b41]">{plan.amount}</p>
                    <p className="text-sm text-gray-500">{plan.note}</p>
                  </div>
                </div>
              </button>

              {index === 0 && (
                <div className="flex items-center justify-center gap-3 my-4">
                  <div className="w-26 border-t border-gray-300" />
                  <span className="text-sm text-gray-500">or</span>
                  <div className="w-26 border-t border-gray-300" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="sticky bottom-0 bg-white pt-2 pb-8">
        <button
          type="button"
          onClick={handleCheckout}
          disabled={isLoading}
          className="btn max-w-[300px] mx-auto disabled:opacity-60"
        >
          {isLoading ? "Loading..." : PLANS[selected].ctaLabel}
        </button>
        <p className="text-xs text-gray-500 mt-3">
          {PLANS[selected].ctaSubtext}
        </p>
      </div>
    </div>
  );
}