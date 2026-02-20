"use client";

import { toast } from "sonner";
import { useState } from "react";

const News = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTimeout(() => {
      toast.success("You've successfully subscribed to our newsletter! 🎉");
      setSubscribed(true);
      setEmail("");
    }, 800);
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 xl:px-0">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-600 px-8 py-14 md:px-16 text-white">
          {/* Decorative circles */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-20 -left-16 w-80 h-80 rounded-full bg-white/5" />
          <div className="absolute top-8 right-32 w-20 h-20 rounded-full bg-white/10" />

          <div className="relative z-10 max-w-xl mx-auto text-center">
            <span className="inline-block text-3xl mb-4">💌</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">
              Stay in the Loop
            </h2>
            <p className="text-white/75 text-sm md:text-base leading-relaxed mb-8">
              Get exclusive deals, new arrivals and beauty tips delivered straight to your inbox. No spam, ever.
            </p>

            {subscribed ? (
              <div className="flex items-center justify-center gap-3 bg-white/20 backdrop-blur rounded-full py-4 px-6 text-white font-semibold">
                <span className="text-xl">✅</span>
                You&apos;re subscribed! Welcome to the Glamora family.
              </div>
            ) : (
              <form onSubmit={handleNewsEmail} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-full bg-white/15 backdrop-blur border border-white/30 px-5 py-3 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  placeholder="your@email.com"
                />
                <button
                  type="submit"
                  className="flex-shrink-0 rounded-full bg-white text-rose-600 font-bold px-7 py-3 text-sm hover:bg-white/90 transition-colors shadow-lg hover:shadow-xl"
                >
                  Subscribe
                </button>
              </form>
            )}

            <p className="text-white/50 text-xs mt-4">
              Join 12,000+ subscribers. Unsubscribe any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;