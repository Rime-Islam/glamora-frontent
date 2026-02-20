"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useResetPass } from "@/hooks/auth.hook";

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

/* ─────────────────────────── steps info ─────────────────────────── */

const steps = [
  { num: "01", title: "Enter your email", desc: "Provide the email linked to your account" },
  { num: "02", title: "Check your inbox", desc: "We'll send a secure reset link" },
  { num: "03", title: "Set new password", desc: "Click the link and choose a strong password" },
];

/* ─────────────────────────── main page ──────────────────────────── */

const ForgetPassword = () => {
  const router = useRouter();
  const { mutate: resetPassword, isPending } = useResetPass();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!email) return;
    resetPassword(
      { email },
      {
        onSuccess: () => {
          toast.success("Reset link sent to your email!");
          setSent(true);
          setTimeout(() => router.push("/auth/signin"), 3000);
        },
        onError: () => {
          toast.error("Something went wrong. Please try again.");
        },
      }
    );
    setEmail("");
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
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
        className="w-[250px] h-[250px] top-1/2 left-1/4"
        style={{ background: "radial-gradient(circle, #0ea5e9, #6366f1)" }}
      />

      {/* Card */}
      <div className="relative z-10 flex w-full max-w-4xl mx-4 rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]">

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
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-4xl mb-6 shadow-lg">
              🔑
            </div>
            <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">
              Forgot Your
              <br />
              <span className="text-fuchsia-200">Password?</span>
            </h1>
            <p className="text-purple-100/80 text-sm leading-relaxed mb-8 max-w-xs">
              No worries! It happens to the best of us. Just enter your email and we&apos;ll send you a secure reset link.
            </p>

            {/* Steps */}
            <div className="space-y-5">
              {steps.map((s) => (
                <div key={s.num} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                    {s.num}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{s.title}</p>
                    <p className="text-purple-200/70 text-xs">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 text-purple-200/60 text-xs">
            Remember your password?{" "}
            <Link href="/auth/signin" className="text-white font-semibold hover:underline">
              Sign in
            </Link>
          </div>
        </div>

        {/* Right form panel */}
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

          {sent ? (
            /* ── Success State ── */
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-violet-500/20 flex items-center justify-center text-5xl mx-auto mb-6 ring-2 ring-violet-500/30">
                📬
              </div>
              <h2 className="text-white text-2xl font-extrabold mb-3">Check Your Inbox!</h2>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto mb-6">
                We&apos;ve sent a password reset link to your email. It may take a few minutes to arrive.
              </p>
              <div className="inline-flex items-center gap-2 text-violet-400 text-sm">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Redirecting to sign in…
              </div>
            </div>
          ) : (
            /* ── Form State ── */
            <>
              <div className="mb-8">
                <h2 className="text-white text-3xl xl:text-4xl font-extrabold mb-2 tracking-tight">
                  Reset Password
                </h2>
                <p className="text-slate-400 text-sm">
                  Enter your email and we&apos;ll send you a reset link.
                </p>
              </div>

              <div className="space-y-5">
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-violet-500 focus:ring-violet-500/20 focus:ring-2 rounded-xl h-12 transition-all duration-200"
                    />
                  </div>
                </LabelInputContainer>

                <button
                  onClick={() => !isPending && handleSend()}
                  disabled={isPending || !email}
                  className="relative group/btn w-full h-12 rounded-xl text-white font-semibold text-base tracking-wide transition-all duration-300 overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
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
                        Sending…
                      </>
                    ) : (
                      "Send Reset Link →"
                    )}
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-10 transition-opacity duration-300" />
                  <BottomGradient />
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-slate-600 text-xs">or</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                <Link href="/auth/signin">
                  <button
                    type="button"
                    className="w-full h-11 rounded-xl text-slate-300 text-sm font-medium border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-200"
                  >
                    ← Back to Sign In
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;