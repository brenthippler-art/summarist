"use client";

import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { openAuthModal } from "@/lib/redux/slices/modalSlice";
import { logout } from "@/lib/firebase/auth";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const uid = useAppSelector((state) => state.auth.uid);

  const handleAuthClick = () => {
    if (uid) {
      logout();
    } else {
      dispatch(openAuthModal("login"));
    }
  };

  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <figure className="nav__img--mask">
          <Image
            className="nav__img"
            src="/logo.png"
            alt="logo"
            width={495}
            height={114}
            priority
          />
        </figure>
        <ul className="nav__list--wrapper">
          <li className="nav__list nav__list--login" onClick={handleAuthClick}>
            {uid ? "Logout" : "Login"}
          </li>
          <li className="nav__list nav__list--mobile">About</li>
          <li className="nav__list nav__list--mobile">Contact</li>
          <li className="nav__list nav__list--mobile">Help</li>
        </ul>
      </div>
    </nav>
  );
}
