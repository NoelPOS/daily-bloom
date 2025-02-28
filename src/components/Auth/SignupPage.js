"use client";

import { Eye, EyeOff, User, Mail } from "lucide-react";
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
    title: "Consistency Unlocks Rewards",
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
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

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
    <div
      className={`min-h-screen bg-backgroundPrimary flex items-center justify-center p-4 rounded-lg`}
    >
      <div className="p-3 w-full max-w-5xl bg-backgroundForm rounded-lg overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-2">
        {/* Left side*/}
        <div className="bg-backgroundForm p-8 flex items-center justify-center">
          <div className="space-y-6 w-full max-w-[400px]">
            <div>
              <h1 className="text-4xl font-bold text-white">Logo</h1>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white">Get Started</h2>
              <p className="text-white/90 mt-2">
                already have an account?
                <Link href="/login" className="text-white hover:underline">
                  sign in
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative w-[350px] mx-auto">
                <input
                  type="text"
                  placeholder="username"
                  name="username"
                  required
                  className="w-full px-4 py-4 rounded-lg bg-white/80  
                    border border-white/30 text-black/60 placeholder:text-black/60
                    focus:outline-none focus:border-white/50"
                />
                <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/60" />
              </div>

              <div className="relative w-[350px] mx-auto">
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  required
                  className="w-full px-4 py-4 rounded-lg bg-white/80  
                    border border-white/30 text-black/60 placeholder:text-black/60
                    focus:outline-none focus:border-white/50"
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/60" />
              </div>

              <div className="relative w-[350px] mx-auto">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  name="password"
                  required
                  className="w-full px-4 py-4 rounded-lg bg-white/80  
                    border border-white/30 text-black/60 placeholder:text-black/60
                    focus:outline-none focus:border-white/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-black/60"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="relative w-[350px] mx-auto">
                <button
                  type="submit"
                  className=" py-4 px-4 bg-white text-2xl text-backgroundForm font-bold rounded-lg
                    hover:bg-white/90"
                >
                  Sign up
                </button>
              </div>
            </form>
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </div>
        </div>

        {/* Right side*/}
        <div className="p-3 bg-backgroundPrimary rounded-lg">
          <div className="relative flex flex-col items-center justify-center h-full">
            <div className="relative w-full h-[300px] md:h-[400px]">
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
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-contain"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
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
            <div className="text-center mt-6 space-y-2 h-[80px] flex flex-col justify-center">
              <h2 className="text-xl font-semibold truncate">
                {slides[currentSlide].title}
              </h2>
              <p className="text-gray-600 min-h-[24px]">
                {formatSubtitle(slides[currentSlide].subtitle)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
