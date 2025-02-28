"use client";

import { Eye, EyeOff, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const slides = [
  {
    image: "/assets/images/auth/login1.png",
    title: "One login",
    subtitle: "endless growth with DailyBloom",
  },
  {
    image: "/assets/images/auth/login2.png",
    title: "Track Progress",
    subtitle: "watch yourself grow every day",
  },
  {
    image: "/assets/images/auth/login3.png",
    title: "Earn Rewards",
    subtitle: "get rewarded for consistency",
  },
];

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

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (formData) => {
    try {
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
      setError("An error occurred during login");
    }
  };

  return (
    <div className="min-h-screen bg-backgroundPrimary flex items-center justify-center p-2">
      <div className="p-2 w-full max-w-4xl bg-backgroundForm rounded-lg overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-2">
        {/* Left side */}
        <div className="p-2 bg-backgroundPrimary rounded-lg">
          <div className="relative flex flex-col items-center justify-center overflow-hidden">
            <div className="relative w-full aspect-square max-w-sm">
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

        {/* Right side */}
        <div className="bg-backgroundForm p-4">
          <Link
            href="/"
            className="inline-flex items-center text-white mb-3 hover:text-white/80"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="text-sm">Back to Home</span>
          </Link>
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h1 className="text-2xl font-bold text-backgroundPrimary">
                Welcome Back
              </h1>
              <p className="text-backgroundPrimary/90 text-sm">
                DailyBloom: Login and thrive with us
              </p>
              <p className="text-backgroundPrimary/90 text-sm">
                every single day!
              </p>
            </div>

            <form
              className="space-y-4 max-w-[280px] mx-auto"
              action={handleSubmit}
            >
              <div className="relative">
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="w-full px-3 py-2 rounded-lg bg-white/80  
                    border border-white/30 text-black/60 placeholder:text-black/60
                    focus:outline-none focus:border-white/50"
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/60" />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  name="password"
                  className="w-full px-3 py-2 rounded-lg bg-white/80  
                    border border-white/30 text-black/60 placeholder:text-black/60
                    focus:outline-none focus:border-white/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black/60"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  className="text-white/90 hover:text-white text-sm"
                >
                  forget password ?
                </button>
              </div>

              <div className="relative">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-white text-xl text-backgroundForm rounded-lg
                  hover:bg-white/90 transition-colors font-medium"
                >
                  Log In
                </button>
              </div>
            </form>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-backgroundForm text-white/80">
                  or continue with
                </span>
              </div>
            </div>

            <div className="flex justify-center items-center gap-6">
              <button className="hover:opacity-90">
                <Image
                  src="/assets/images/auth/google.png"
                  alt="google"
                  width={30}
                  height={30}
                />
              </button>
              <button className="hover:opacity-90">
                <Image
                  src="/assets/images/auth/facebook.png"
                  alt="facebook"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              </button>
              <button className="hover:opacity-90">
                <Image
                  src="/assets/images/auth/instagram.png"
                  alt="instagram"
                  width={30}
                  height={30}
                />
              </button>
            </div>

            <p className="text-center text-white/90 text-sm">
              Not a member?{" "}
              <Link href="/signup" className="text-white hover:underline">
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
