"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/redux/hooks";
import Navbar from "@/components/home/Navbar";
import Landing from "@/components/home/Landing";
import Features from "@/components/home/Features";
import Reviews from "@/components/home/Reviews";
import Numbers from "@/components/home/Numbers";
import Footer from "@/components/home/Footer";

export default function Home() {
  const router = useRouter();
  const uid = useAppSelector((state) => state.auth.uid);
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  useEffect(() => {
    if (!isLoading && uid) {
      router.replace("/for-you");
    }
  }, [isLoading, uid, router]);

  if (isLoading || uid) {
    return null;
  }

  return (
    <>
      <Navbar />
      <Landing />
      <Features />
      <Reviews />
      <Numbers />
      <Footer />
    </>
  );
}
