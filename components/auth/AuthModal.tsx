"use client";

import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { closeAuthModal, switchAuthView } from "@/lib/redux/slices/modalSlice";
import { IoClose } from "react-icons/io5";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.modal.isOpen);
  const view = useAppSelector((state) => state.modal.view);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={() => dispatch(closeAuthModal())}
    >
      <div
        className="bg-white rounded-lg w-full max-w-[400px] relative overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-4 text-gray-800 hover:text-gray-600 text-4xl"
          onClick={() => dispatch(closeAuthModal())}
          aria-label="Close"
        >
          <IoClose />
        </button>

        <div className="px-8 pt-8 pb-6">
          {view === "login" ? <LoginForm /> : <RegisterForm />}
        </div>

        <button
          type="button"
          onClick={() =>
            dispatch(switchAuthView(view === "login" ? "register" : "login"))
          }
          className="w-full bg-gray-100 hover:bg-gray-200 transition-colors text-center py-4 border-t border-gray-200 text-blue-600 text-sm"
        >
          {view === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
        </button>
      </div>
    </div>
  );
}
