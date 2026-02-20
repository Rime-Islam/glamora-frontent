import React from "react";

const features = [
  {
    icon: "🚀",
    title: "Fast Delivery",
    desc: "Same-day & next-day shipping to your doorstep.",
    bg: "#FFF1F2",
    iconBg: "#FFE4E6",
  },
  {
    icon: "💰",
    title: "Best Prices",
    desc: "Guaranteed lowest prices on all products daily.",
    bg: "#FFFBEB",
    iconBg: "#FEF3C7",
  },
  {
    icon: "⏰",
    title: "Save Time",
    desc: "Shop thousands of products in one click.",
    bg: "#EFF6FF",
    iconBg: "#DBEAFE",
  },
  {
    icon: "✨",
    title: "Latest Trends",
    desc: "New arrivals from top cosmetic brands weekly.",
    bg: "#F5F3FF",
    iconBg: "#EDE9FE",
  },
];

const Choose = () => {
  return (
    <section className="bg-white py-16 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 xl:px-0">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500 mb-2">
            Why Glamora
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            We Offer You The Best
          </h2>
          <p className="text-gray-500 mt-3 text-sm max-w-md mx-auto leading-relaxed">
            From exclusive collections to lightning-fast delivery — everything you need, all in one place.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-default border border-transparent hover:border-gray-100"
              style={{ backgroundColor: f.bg }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: f.iconBg }}
              >
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-12 rounded-3xl bg-gray-950 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold mb-2">
              Ready to Glow Up? ✨
            </h3>
            <p className="text-gray-400 text-sm max-w-sm">
              Join over 50,000 beauty lovers who shop smarter with Glamora.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a
              href="/auth/signup"
              className="px-6 py-3 bg-white text-black font-semibold rounded-full text-sm hover:bg-gray-100 transition-colors"
            >
              Get Started Free
            </a>
            <a
              href="/product"
              className="px-6 py-3 border border-white/20 text-white font-semibold rounded-full text-sm hover:bg-white/10 transition-colors"
            >
              Browse Products
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Choose;