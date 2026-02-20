"use client";

import React, { useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUserRegistration } from "@/hooks/auth.hook";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthContext } from "@/providers/AuthProvider";
import { jwtDecode } from "jwt-decode";
import { IUserToken } from "@/interface/token.interface";
import { ICreateUser } from "@/interface/user.interface";

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

/* ─────────────────────────── features list ──────────────────────────── */

const features = [
  { icon: "🛍️", title: "10,000+ Products", desc: "Curated collections updated daily" },
  { icon: "🚀", title: "Fast Delivery", desc: "Same-day & next-day shipping" },
  { icon: "🔒", title: "Secure Payments", desc: "Bank-grade encryption on every order" },
  { icon: "🎁", title: "Exclusive Deals", desc: "Members-only discounts & flash sales" },
];

/* ─────────────────────────── main page ──────────────────────────── */

const Signup = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<ICreateUser>();
  const { mutate, isPending } = useUserRegistration();
  const auth = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<ICreateUser> = async (data: ICreateUser) => {
    mutate(data, {
      onSuccess: async (data: { data: string }) => {
        const decode = jwtDecode(data?.data as string) as IUserToken;
        toast.success("Account created successfully!");
        if (decode?.role === "VENDOR") {
          auth?.setIsLoading(true);
          router.push(`/${(decode?.role as string).toLowerCase()}/manage-shop`);
        } else {
          router.push("/auth/signin");
        }
      },
      onError: () => {
        toast.error("Something went wrong. Please try again.");
      },
    });
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-8"
      style={{
        background:
          "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
      }}
    >
      {/* Ambient orbs */}
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

      {/* Card */}
      <div className="relative z-10 flex w-full max-w-5xl mx-4 rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]">

        {/* Left panel */}
        <div
          className="hidden lg:flex flex-col justify-between w-5/12 p-12 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(145deg, rgba(124,58,237,0.9) 0%, rgba(79,70,229,0.85) 50%, rgba(139,92,246,0.9) 100%)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Floating shapes */}
          <div className="absolute top-16 right-12 w-20 h-20 rounded-full border-2 border-white/20 animate-pulse" />
          <div
            className="absolute bottom-24 left-8 w-12 h-12 rounded-lg border-2 border-white/20 rotate-45 animate-bounce"
            style={{ animationDuration: "3s" }}
          />

          {/* Brand */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-xl font-bold text-white shadow-lg">
                G
              </div>
              <span className="text-white text-2xl font-bold tracking-wide">Glamora</span>
            </div>
          </div>

          {/* Hero */}
          <div className="relative z-10 my-auto">
            <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">
              Join the
              <br />
              <span className="text-fuchsia-200">Community!</span>
            </h1>
            <p className="text-purple-100/80 text-sm leading-relaxed mb-8 max-w-xs">
              Create your free account and unlock a world of premium fashion, exclusive deals and seamless shopping.
            </p>

            {/* Feature list */}
            <div className="space-y-4">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-3">
                  <span className="text-2xl leading-none">{f.icon}</span>
                  <div>
                    <p className="text-white text-sm font-semibold">{f.title}</p>
                    <p className="text-purple-200/70 text-xs">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <div className="relative z-10 text-purple-200/60 text-xs">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-white font-semibold hover:underline">
              Sign in
            </Link>
          </div>
        </div>

        {/* Right form panel */}
        <div
          className="flex-1 flex flex-col justify-center p-8 md:p-10"
          style={{
            background: "rgba(15, 12, 41, 0.92)",
            backdropFilter: "blur(24px)",
          }}
        >
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center text-white font-bold shadow">
              G
            </div>
            <span className="text-white text-xl font-bold">Glamora</span>
          </div>

          {/* Heading */}
          <div className="mb-7">
            <h2 className="text-white text-3xl font-extrabold mb-1 tracking-tight">
              Create Account
            </h2>
            <p className="text-slate-400 text-sm">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="text-violet-400 hover:text-violet-300 font-semibold transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <LabelInputContainer>
                <Label htmlFor="name" className="text-slate-300 text-sm font-medium">
                  Full Name
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-base">👤</span>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    required
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-violet-500 focus:ring-violet-500/20 focus:ring-2 rounded-xl h-11 transition-all duration-200"
                  />
                </div>
                {errors.name && (
                  <span className="text-rose-400 text-xs">{errors.name.message}</span>
                )}
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="email" className="text-slate-300 text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-base">✉️</span>
                  <Input
                    id="email"
                    placeholder="you@example.com"
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    required
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-violet-500 focus:ring-violet-500/20 focus:ring-2 rounded-xl h-11 transition-all duration-200"
                  />
                </div>
                {errors.email && (
                  <span className="text-rose-400 text-xs">{errors.email.message}</span>
                )}
              </LabelInputContainer>
            </div>

            {/* Password */}
            <LabelInputContainer>
              <Label htmlFor="password" className="text-slate-300 text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-base">🔒</span>
                <Input
                  id="password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: "Password is required" })}
                  required
                  className="pl-10 pr-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-violet-500 focus:ring-violet-500/20 focus:ring-2 rounded-xl h-11 transition-all duration-200"
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

            {/* Address + Phone row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <LabelInputContainer>
                <Label htmlFor="address" className="text-slate-300 text-sm font-medium">
                  Address
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-base">📍</span>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Dhaka, Bangladesh"
                    {...register("address", { required: "Address is required" })}
                    required
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-violet-500 focus:ring-violet-500/20 focus:ring-2 rounded-xl h-11 transition-all duration-200"
                  />
                </div>
                {errors.address && (
                  <span className="text-rose-400 text-xs">{errors.address.message}</span>
                )}
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="mobile" className="text-slate-300 text-sm font-medium">
                  Phone Number
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-base">📱</span>
                  <Input
                    id="mobile"
                    type="number"
                    placeholder="01XXXXXXXXX"
                    {...register("mobile", { required: "Phone is required" })}
                    required
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-violet-500 focus:ring-violet-500/20 focus:ring-2 rounded-xl h-11 transition-all duration-200"
                  />
                </div>
                {errors.mobile && (
                  <span className="text-rose-400 text-xs">{errors.mobile.message}</span>
                )}
              </LabelInputContainer>
            </div>

            {/* Account Type */}
            <LabelInputContainer>
              <Label htmlFor="accountType" className="text-slate-300 text-sm font-medium">
                Account Type
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-base">🏷️</span>
                <select
                  id="accountType"
                  required
                  {...register("accountType", { required: "Account type is required" })}
                  className="w-full pl-10 pr-4 h-11 rounded-xl bg-white/5 border border-white/10 text-slate-300 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all duration-200 appearance-none"
                  style={{ colorScheme: "dark" }}
                >
                  <option value="CUSTOMER" className="bg-[#1a1535] text-white">
                    🛍️  Customer
                  </option>
                  <option value="VENDOR" className="bg-[#1a1535] text-white">
                    🏪  Seller / Vendor
                  </option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-xs">▼</span>
              </div>
            </LabelInputContainer>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="relative group/btn w-full h-12 rounded-xl text-white font-semibold text-base tracking-wide transition-all duration-300 overflow-hidden mt-2"
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
                    Creating Account…
                  </>
                ) : (
                  "Create Account →"
                )}
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-10 transition-opacity duration-300" />
              <BottomGradient />
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-slate-600 text-xs">
            By creating an account you agree to our{" "}
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

export default Signup;