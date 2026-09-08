"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useAppDispatch } from "@/lib/redux/hooks";
import { closeAuthModal } from "@/lib/redux/slices/modalSlice";
import { registerWithEmail, loginWithGoogle } from "@/lib/firebase/auth";
import { getAuthErrorMessage } from "@/lib/firebase/authErrors";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSuccess = () => {
    dispatch(closeAuthModal());
    router.push("/for-you");
  };

  const runAuthAction = async (action: () => Promise<unknown>) => {
    setError("");
    setIsSubmitting(true);
    try {
      await action();
      handleSuccess();
    } catch (err) {
      setError(getAuthErrorMessage(err, "register"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    runAuthAction(() => registerWithEmail(email, password));
  };

  return (
    <>
      <h2 className="text-xl font-bold text-center text-brand-navy mb-6">
        Sign up to Summarist
      </h2>

      {error && (
        <p className="text-red-600 text-sm text-center mb-4">{error}</p>
      )}

      <button
        type="button"
        onClick={() => runAuthAction(loginWithGoogle)}
        disabled={isSubmitting}
        className="w-full h-10 rounded flex items-stretch overflow-hidden border border-gray-300 mb-4 disabled:opacity-60"
      >
        <span className="w-10 h-full bg-white flex items-center justify-center">
          <FcGoogle size={20} />
        </span>
        <span className="flex-1 bg-[#4285F4] text-white flex items-center justify-center font-medium">
          Sign up with Google
        </span>
      </button>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 border-t border-gray-300" />
        <span className="text-sm text-gray-500">or</span>
        <div className="flex-1 border-t border-gray-300" />
      </div>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded h-11 px-4 w-full outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded h-11 px-4 w-full outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn mt-1 disabled:opacity-60"
        >
          {isSubmitting ? "Signing up..." : "Sign up"}
        </button>
      </form>
    </>
  );
}
