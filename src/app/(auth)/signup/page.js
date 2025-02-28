"use client";

import {
  Eye,
  EyeOff,
  User,
  Mail,
  ArrowDown,
  ArrowBigLeft,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const slides = [
  {
    image: "/assets/images/auth/signup1.png",
    title: "One login",
    subtitle: "endless growth with DailyBloom",
  },
  {
    image: "/assets/images/auth/signup2.png",
    title: "Small Steps Big Rewards",
    subtitle: "Stay Consisten With Dailybloom",
  },
  {
    image: "/assets/images/auth/signup3.png",
    title: "Consistency Unlocks Rewards Rewards",
    subtitle: "Start Blooming with DailyBloom",
  },
];

export default function SignupPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Highlight Text
  const formatSubtitle = (text) => {
    if (text.includes("DailyBloom")) {
      return text.split("DailyBloom").map((part, index, array) => (
        <span key={index}>
          {part}
          {index < array.length - 1 && (
            <span className="text-backgroundForm">DailyBloom</span>
          )}
        </span>
      ));
    }
    return text;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.get("username"),
          email: formData.get("email"),
          password: formData.get("password"),
          gender: formData.get("gender"),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // If signup successful, sign in automatically
      const result = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-backgroundPrimary flex items-center justify-center p-2">
      <div className="p-2 w-full max-w-4xl bg-backgroundForm rounded-lg overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-2">
        {/* Left side*/}
        <div className="bg-backgroundForm p-4">
          <Link
            href="/"
            className="inline-flex items-center text-white mb-3 hover:text-white/80"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="text-sm">Back to Home</span>
          </Link>
          <div className=" space-y-4">
            <div>
              <h1 className="text-4xl font-bold text-white">Daily Bloom</h1>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Get Started</h2>
              <p className="text-white/90 mt-1 text-sm">
                already have an account?{" "}
                <Link href="/login" className="hover:underline">
                  Sign in
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="username"
                  name="username"
                  required
                  className="w-full px-3 py-3 rounded-lg bg-white/80  
                    border border-white/30 text-black/60 placeholder:text-black/60
                    focus:outline-none focus:border-white/50"
                />
                <User className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/60" />
              </div>

              <div className="relative">
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  required
                  className="w-full px-3 py-3 rounded-lg bg-white/80  
                    border border-white/30 text-black/60 placeholder:text-black/60
                    focus:outline-none focus:border-white/50"
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/60" />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  name="password"
                  required
                  className="w-full px-3 py-3 rounded-lg bg-white/80  
                    border border-white/30 text-black/60 placeholder:text-black/60
                    focus:outline-none focus:border-white/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-black/60"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="relative">
                <select
                  name="gender"
                  required
                  className="w-full px-3 py-3 rounded-lg bg-white/80  
                    border border-white/30 text-black/60 placeholder:text-black/60
                    focus:outline-none focus:border-white/50 appearance-none"
                >
                  <option value="" disabled selected>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
                <ArrowDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/60" />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-white text-xl text-backgroundForm font-bold rounded-lg
                  hover:bg-white/90"
              >
                Sign up
              </button>
            </form>
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </div>
        </div>

        {/* Right side*/}
        <div className="p-2 bg-backgroundPrimary rounded-lg">
          <div className="relative flex flex-col items-center justify-center overflow-hidden">
            <div className="relative w-full aspect-square max-w-sm ">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out 
                    ${
                      index === currentSlide
                        ? "opacity-100 translate-x-0"
                        : index < currentSlide
                        ? "opacity-0 -translate-x-full"
                        : "opacity-0 translate-x-full"
                    }`}
                >
                  <Image
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              {" "}
              {/* Increased gap between dots */}
              {slides.map((value, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`rounded-full transition-all duration-1000 ease-in-out
                    ${
                      index === currentSlide
                        ? "w-6 bg-violet-500"
                        : "w-2 bg-gray-300"
                    } h-2`}
                />
              ))}
            </div>
            <div className="text-center mt-3 space-y-1">
              <h2 className="text-lg font-semibold">
                {slides[currentSlide].title}
              </h2>
              <p className="text-gray-600 text-sm">
                {formatSubtitle(slides[currentSlide].subtitle)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
