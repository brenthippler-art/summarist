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

interface SidebarProps {
  onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const uid = useAppSelector((state) => state.auth.uid);

  const handleAuthClick = () => {
    onNavigate?.();
    if (uid) {
      logout();
    } else {
      dispatch(openAuthModal("login"));
    }
  };

  const isPlayerPage = pathname?.startsWith("/player/");

  return (
    <aside className="w-[260px] md:w-[200px] shrink-0 h-screen md:fixed md:top-0 md:left-0 flex flex-col bg-[#f7faf9]">
      <div className="px-6 py-6 mb-8 flex justify-center">
        <Image src="/logo.png" alt="logo" width={200} height={46} className="w-[160px] h-auto" />
      </div>

      <nav className="flex-1 flex flex-col">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = href !== null && pathname === href;

          const content = (
            <span
              className={`flex items-center gap-4 md:gap-3 px-6 py-6 md:py-5 text-lg md:text-md text-[#032b41] ${
                isActive
                  ? "border-l-4 border-[#2bd97c] pl-5 hover:bg-gray-200"
                  : href === null
                  ? "cursor-not-allowed"
                  : "hover:bg-gray-200"
              }`}
            >
              <Icon size={24} className="md:hidden" />
              <Icon size={20} className="hidden md:block" />
              {label}
            </span>
          );

          return href ? (
            <Link key={label} href={href} onClick={onNavigate}>
              {content}
            </Link>
          ) : (
            <div key={label}>{content}</div>
          );
        })}
        {isPlayerPage && <FontSizeControl />}
      </nav>

      <div className={`flex flex-col mb-6 ${isPlayerPage ? "pb-20" : ""}`}>
        <Link href="/settings" onClick={onNavigate}>
          <span
            className={`flex items-center gap-4 md:gap-3 px-6 py-6 md:py-5 text-lg md:text-md text-[#032b41] hover:bg-gray-200 ${
              pathname === "/settings" ? "border-l-4 border-[#2bd97c] pl-5" : ""
            }`}
          >
            <FiSettings size={24} className="md:hidden" />
            <FiSettings size={20} className="hidden md:block" />
            Settings
          </span>
        </Link>
        <div>
          <span className="flex items-center gap-4 md:gap-3 px-6 py-6 md:py-5 text-lg md:text-md text-[#032b41] cursor-not-allowed">
            <FiHelpCircle size={24} className="md:hidden" />
            <FiHelpCircle size={20} className="hidden md:block" />
            Help &amp; Support
          </span>
        </div>
        <button
          type="button"
          onClick={handleAuthClick}
          className="flex items-center gap-4 md:gap-3 px-6 py-6 md:py-5 text-lg md:text-md text-[#032b41] hover:bg-gray-200 text-left"
        >
          <FiLogOut size={24} className="md:hidden" />
          <FiLogOut size={20} className="hidden md:block" />
          {uid ? "Logout" : "Login"}
        </button>
      </div>
    </aside>
  );
}