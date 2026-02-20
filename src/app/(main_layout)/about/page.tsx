import Contact from "@/components/design/aboutpage/Contact";
import Frequently from "@/components/design/aboutpage/Frequently";

const page = () => {
  return (
    <div className="min-h-screen">
      {/* ─── Hero Section ─── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 md:py-24">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 xl:px-0 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-rose-400 mb-3">
            About Glamora
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Your Trusted Marketplace
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            We connect thousands of vendors and customers through a seamless,
            secure, and delightful shopping experience. Discover, compare, and
            shop with confidence.
          </p>

          {/* Quick stats */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: "50K+", label: "Happy Customers", icon: "😊" },
              { value: "10K+", label: "Products", icon: "🛍️" },
              { value: "500+", label: "Vendors", icon: "🏪" },
              { value: "4.9★", label: "Avg. Rating", icon: "⭐" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
              >
                <span className="text-xl mb-1 block">{s.icon}</span>
                <span className="text-2xl font-extrabold text-white block">
                  {s.value}
                </span>
                <span className="text-gray-400 text-xs">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Mission, Vision, Values ─── */}
      <div className="max-w-7xl mx-auto px-4 xl:px-0 py-16">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500 mb-1">
            Why Choose Us
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            What Makes Us Different
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "🎯",
              title: "Our Mission",
              desc: "To empower vendors and delight customers by creating the most trusted and innovative multi-vendor marketplace.",
            },
            {
              icon: "👁️",
              title: "Our Vision",
              desc: "To become the leading e-commerce platform that bridges vendors and customers with transparency, quality, and trust.",
            },
            {
              icon: "💎",
              title: "Our Values",
              desc: "We believe in authenticity, customer-first thinking, fast delivery, secure payments, and a premium shopping experience.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-300"
            >
              <span className="text-3xl mb-4 block">{item.icon}</span>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <Frequently />

      {/* Contact */}
      <Contact />
    </div>
  );
};

export default page;