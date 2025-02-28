// Landing Page ("/")
"use client";

import Hero from "@/components/Home/Hero";
import HeroFooter from "@/components/Home/HeroFooter";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div>
      <Hero />
      <HeroFooter />
    </div>
  );
}
