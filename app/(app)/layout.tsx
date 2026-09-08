"use client";

import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import Sidebar from "@/components/layout/Sidebar";
import SearchBar from "@/components/search/SearchBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="flex">
      {/* Desktop sidebar — visible md and up */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile overlay */}
      <div
        onClick={() => setIsMobileNavOpen(false)}
        className={`fixed inset-0 bg-black/50 z-10 md:hidden transition-opacity duration-300 ${
          isMobileNavOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-20 md:hidden transition-transform duration-300 ${
          isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onNavigate={() => setIsMobileNavOpen(false)} />
      </div>

      <div className="flex-1 md:ml-[200px] min-w-0">
        <div className="border-b border-gray-200">
          <div className="max-w-[1070px] mx-auto flex items-center justify-end gap-4 px-6 py-6">
            <SearchBar />
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open menu"
              className="md:hidden text-[#032b41]"
            >
              <FiMenu size={24} />
            </button>
          </div>
        </div>
        <div className="max-w-[1070px] mx-auto px-6 py-10">{children}</div>
      </div>
    </div>
  );
}
