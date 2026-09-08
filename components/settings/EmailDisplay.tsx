"use client";

import { useAppSelector } from "@/lib/redux/hooks";

export default function EmailDisplay() {
  const email = useAppSelector((state) => state.auth.email);

  return (
    <div className="py-6">
      <h2 className="font-bold text-brand-navy mb-2">Email</h2>
      <p className="text-brand-navy">{email}</p>
    </div>
  );
}
