"use client";
import React, { useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useUserlogin } from "@/hooks/auth.hook";
import { SubmitHandler, useForm } from "react-hook-form";
import { ICreateUser } from "@/interface/user.interface";
import config from "@/config";

/* ─────────────────────────── helpers ─────────────────────────── */

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-violet-400 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent" />
  </>
);

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex flex-col space-y-1.5 w-full", className)}>
    {children}
  </div>
);

/* ─────────────────────── decorative orbs ─────────────────────── */

const Orb = ({
  style,
  className,
}: {
  style?: React.CSSProperties;
  className?: string;
}) => (
  <div
    className={cn("absolute rounded-full blur-3xl opacity-30", className)}
    style={style}
  />
);

/* ─────────────────────────── main page ──────────────────────────── */

const Signin = () => {
  const authData = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateUser>();
  const router = useRouter();
  const { mutate, isPending } = useUserlogin();
  const [showPassword, setShowPassword] = useState(false);

  const loginWith = (
    email: string | undefined,
    password: string | undefined,
    redirect: string
  ) => {
    mutate(
      { email: email ?? "", password: password ?? "" } as ICreateUser,
      {
        onSuccess: async () => {
          authData?.setIsLoading(true);
          toast.success("Welcome To Glamora.");
          router.push(redirect);
        },
        onError: (error: Error) => {
          toast.error(error.message || "Something Went Wrong!! Try again.");
        },
      }
    );
  };

  const onSubmit: SubmitHandler<ICreateUser> = (data) => {
    mutate(data, {
      onSuccess: async () => {
        authData?.setIsLoading(true);
        toast.success("Welcome To Glamora.");
        router.push("/");
      },
      onError: (error: Error) => {
        toast.error(error.message || "Something Went Wrong!! Try again.");
      },
    });
  };

  const quickLogins = [
    {
      label: "User",
      emoji: "👤",
      onClick: () =>
        loginWith(config.user_email, config.user_password, "/customer/dashboard"),
    },
    {
      label: "Admin",
      emoji: "🛡️",
      onClick: () =>
        loginWith(config.admin_email, config.user_password, "/admin/dashboard"),
    },
    {
      label: "Vendor",
      emoji: "🏪",
      onClick: () =>
        loginWith(config.vendor_email, config.user_password, "/vendor/dashboard"),
    },
  ];

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
      }}
    >
      {/* ── Ambient orbs ── */}
      <Orb
        className="w-[500px] h-[500px] -top-32 -left-32"
        style={{ background: "radial-gradient(circle, #7c3aed, #4f46e5)" }}
      />
      <Orb
        className="w-[400px] h-[400px] -bottom-20 -right-20"
        style={{ background: "radial-gradient(circle, #db2777, #9333ea)" }}
      />
      <Orb
        className="w-[300px] h-[300px] top-1/2 left-1/4"
        style={{ background: "radial-gradient(circle, #0ea5e9, #6366f1)" }}
      />

      {/* ── Card container ── */}
      <div className="relative z-10 flex w-full max-w-5xl mx-4 rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]">

        {/* ── Left decorative panel ── */}
        <div
          className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(145deg, rgba(124,58,237,0.9) 0%, rgba(79,70,229,0.85) 50%, rgba(139,92,246,0.9) 100%)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Floating shapes */}
          <div className="absolute top-16 right-12 w-20 h-20 rounded-full border-2 border-white/20 animate-pulse" />
          <div className="absolute bottom-32 left-8 w-12 h-12 rounded-lg border-2 border-white/20 rotate-45 animate-bounce" style={{ animationDuration: "3s" }} />
          <div className="absolute top-1/2 right-8 w-8 h-8 rounded-full bg-white/10" />

          {/* Brand */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-xl font-bold text-white shadow-lg">
                G
              </div>
              <span className="text-white text-2xl font-bold tracking-wide">Glamora</span>
            </div>
          </div>

          {/* Hero text */}
          <div className="relative z-10 my-auto">
            <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-6">
              Welcome
              <br />
              <span className="text-fuchsia-200">Back!</span>
            </h1>
            <p className="text-purple-100/80 text-base xl:text-lg leading-relaxed max-w-xs">
              Sign in to explore thousands of curated products, manage your orders, and enjoy an exclusive shopping experience.
            </p>

            {/* Stats */}
            <div className="flex gap-8 mt-10">
              {[
                { value: "50K+", label: "Products" },
                { value: "12K+", label: "Customers" },
                { value: "4.9★", label: "Rating" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-white text-xl font-bold">{s.value}</p>
                  <p className="text-purple-200/70 text-xs">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="relative z-10 bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
            <p className="text-white/90 text-sm italic leading-relaxed">
              &ldquo;Glamora transformed how I shop online — absolutely premium experience!&rdquo;
            </p>
            <div className="flex items-center gap-2 mt-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-fuchsia-400 to-violet-400 flex items-center justify-center text-xs font-bold text-white">
                A
              </div>
              <span className="text-purple-100 text-xs font-medium">Arif H. — Verified Buyer</span>
            </div>
          </div>
        </div>

        {/* ── Right form panel ── */}
        <div
          className="flex-1 flex flex-col justify-center p-8 md:p-12"
          style={{
            background: "rgba(15, 12, 41, 0.92)",
            backdropFilter: "blur(24px)",
          }}
        >
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center text-white font-bold shadow">
              G
            </div>
            <span className="text-white text-xl font-bold">Glamora</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-white text-3xl xl:text-4xl font-extrabold mb-2 tracking-tight">
              Sign In
            </h2>
            <p className="text-slate-400 text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-violet-400 hover:text-violet-300 font-semibold transition-colors"
              >
                Create one free
              </Link>
            </p>
          </div>

          {/* Quick Demo Logins */}
          <div className="mb-6">
            <p className="text-slate-500 text-xs uppercase tracking-widest mb-3">
              Quick Demo Login
            </p>
            <div className="flex gap-2 flex-wrap">
              {quickLogins.map((q) => (
                <button
                  key={q.label}
                  onClick={q.onClick}
                  disabled={isPending}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border border-violet-500/40 text-violet-300 bg-violet-500/10 hover:bg-violet-500/25 hover:border-violet-400 hover:text-white transition-all duration-200 disabled:opacity-50"
                >
                  <span>{q.emoji}</span>
                  <span>{q.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-slate-600 text-xs">or sign in manually</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <LabelInputContainer>
              <Label
                htmlFor="email"
                className="text-slate-300 text-sm font-medium"
              >
                Email Address
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-base">
                  ✉️
                </span>
                <Input
                  id="email"
                  placeholder="you@example.com"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  required
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-violet-500 focus:ring-violet-500/20 focus:ring-2 rounded-xl h-12 transition-all duration-200"
                />
              </div>
              {errors.email && (
                <span className="text-rose-400 text-xs">{errors.email.message}</span>
              )}
            </LabelInputContainer>

            <LabelInputContainer>
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-slate-300 text-sm font-medium"
                >
                  Password
                </Label>
                <Link
                  href="/auth/forget-password"
                  className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-base">
                  🔒
                </span>
                <Input
                  id="password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: "Password is required" })}
                  required
                  className="pl-10 pr-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-violet-500 focus:ring-violet-500/20 focus:ring-2 rounded-xl h-12 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-sm transition-colors"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && (
                <span className="text-rose-400 text-xs">{errors.password.message}</span>
              )}
            </LabelInputContainer>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="relative group/btn w-full h-12 rounded-xl text-white font-semibold text-base tracking-wide transition-all duration-300 overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%)",
                boxShadow: "0 4px 24px rgba(124, 58, 237, 0.4)",
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isPending ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Signing in…
                  </>
                ) : (
                  "Sign In →"
                )}
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-10 transition-opacity duration-300" />
              <BottomGradient />
            </button>
          </form>

          {/* Footer note */}
          <p className="mt-8 text-center text-slate-600 text-xs">
            By signing in you agree to our{" "}
            <Link href="/terms-of-use" className="text-slate-400 hover:text-slate-300 underline transition-colors">
              Terms of Use
            </Link>{" "}
            &amp;{" "}
            <Link href="/privacy-policy" className="text-slate-400 hover:text-slate-300 underline transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;