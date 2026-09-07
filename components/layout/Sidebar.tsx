"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiBookmark,
  FiEdit3,
  FiSearch,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { openAuthModal } from "@/lib/redux/slices/modalSlice";
import { logout } from "@/lib/firebase/auth";
import FontSizeControl from "./FontSizeControl";

const NAV_ITEMS = [
  { label: "For you", href: "/for-you", icon: FiHome },
  { label: "My Library", href: "/library", icon: FiBookmark },
  { label: "Highlights", href: null, icon: FiEdit3 },
  { label: "Search", href: null, icon: FiSearch },
];

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const uid = useAppSelector((state) => state.auth.uid);

  const handleAuthClick = () => {
    if (uid) {
      logout();
    } else {
      dispatch(openAuthModal("login"));
    }
  };

  const isPlayerPage = pathname?.startsWith("/player/");

  return (
    <aside className="w-[200px] shrink-0 h-screen sticky top-0 flex flex-col bg-[#f7faf9]">
      <div className="px-6 py-6 mb-8">
        <Image
          src="/logo.png"
          alt="logo"
          width={200}
          height={46}
          className="w-full h-auto"
        />
      </div>

      <nav className="flex-1 flex flex-col">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = href !== null && pathname === href;

          const content = (
            <span
              className={`flex items-center gap-3 px-6 py-5 text-[#032b41] text-md ${
                isActive
                  ? "border-l-4 border-[#2bd97c] pl-5 hover:bg-gray-200"
                  : href === null
                    ? "cursor-not-allowed"
                    : "hover:bg-gray-200"
              }`}
            >
              <Icon size={20} />
              {label}
            </span>
          );

          return href ? (
            <Link key={label} href={href}>
              {content}
            </Link>
          ) : (
            <div key={label}>{content}</div>
          );
        })}
        {isPlayerPage && <FontSizeControl />}
      </nav>

      <div className="flex flex-col mb-6">
        <Link href="/settings">
          <span
            className={`flex items-center gap-3 px-6 py-5 text-md text-[#032b41] hover:bg-gray-200 ${
              pathname === "/settings" ? "border-l-4 border-[#2bd97c] pl-5" : ""
            }`}
          >
            <FiSettings size={20} />
            Settings
          </span>
        </Link>
        <div>
          <span className="flex items-center gap-3 px-6 py-5 text-md text-[#032b41] cursor-not-allowed">
            <FiHelpCircle size={20} />
            Help &amp; Support
          </span>
        </div>
        <button
          type="button"
          onClick={handleAuthClick}
          className="flex items-center gap-3 px-6 py-5 text-md text-[#032b41] hover:bg-gray-200"
        >
          <FiLogOut size={20} />
          {uid ? "Logout" : "Login"}
        </button>
      </div>
    </aside>
  );
}
