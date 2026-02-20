"use client";

import { toast } from "sonner";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Sparkles, ArrowRight } from "lucide-react";

const News = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTimeout(() => {
      toast.success("Welcome to the inner circle! ✨");
      setSubscribed(true);
      setEmail("");
    }, 800);
  };

  return (
    <section className="bg-white py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 xl:px-0">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[3rem] md:rounded-[4rem] bg-gray-900 px-8 py-16 md:px-20 md:py-24 text-white shadow-2xl shadow-gray-200"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
            <Mail className="w-64 h-64 text-rose-500" />
          </div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-rose-500/10 blur-3xl" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/5 blur-3xl" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            {/* Content Side */}
            <div className="text-center lg:text-left max-w-xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-white/5 backdrop-blur border border-white/10 text-rose-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-full px-4 py-2 mb-6"
              >
                <Sparkles className="w-3 h-3" />
                Insider Access
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
                Stay in the <span className="text-rose-500">Loop.</span>
              </h2>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-0 font-medium">
                Get exclusive drops, early access to flash sales, and beauty curated just for you. join our elite 2% of shoppers.
              </p>
            </div>

            {/* Form Side */}
            <div className="w-full max-w-md">
              {subscribed ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-xl rounded-[2.5rem] p-8 text-center"
                >
                  <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-200/50">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-2">Registry Confirmed</h3>
                  <p className="text-emerald-200/70 text-sm font-medium">
                    You're now synchronized with Glamora's exclusive updates.
                  </p>
                </motion.div>
              ) : (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-fuchsia-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                  <form 
                    onSubmit={handleNewsEmail} 
                    className="relative flex flex-col gap-4 bg-[#0a0a0a] border border-white/5 p-4 rounded-[2.5rem]"
                  >
                    <div className="relative flex-1">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-16 rounded-[1.75rem] bg-white/5 border border-white/5 pl-14 pr-6 text-white placeholder:text-gray-600 text-sm font-bold focus:outline-none focus:border-rose-500/50 focus:ring-4 focus:ring-rose-500/10 transition-all"
                        placeholder="Enter your professional email"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full h-16 rounded-[1.75rem] bg-rose-500 text-white font-black text-sm uppercase tracking-widest hover:bg-rose-600 transition-all duration-300 shadow-xl shadow-rose-900/20 flex items-center justify-center gap-3 group/btn"
                    >
                      Initialize Subscription
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest text-center mt-2 px-4">
                      No spam. Only high-performance updates. Unsubscribe anytime.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Background decoration for the section */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-rose-50 rounded-full blur-3xl -z-10 opacity-50" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-50 rounded-full blur-3xl -z-10 opacity-50" />
    </section>
  );
};

export default News;
