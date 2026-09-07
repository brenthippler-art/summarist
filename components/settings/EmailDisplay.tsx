"use client";

import { useAppSelector } from "@/lib/redux/hooks";

export default function EmailDisplay() {
  const email = useAppSelector((state) => state.auth.email);

  return (
    <div className="py-6">
      <h2 className="font-bold text-[#032b41] mb-2">Email</h2>
      <p className="text-[#032b41]">{email}</p>
    </div>
  );
}