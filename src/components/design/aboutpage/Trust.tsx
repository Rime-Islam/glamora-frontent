const Trust = () => {
  const brands = [
    { name: "Amazon", letter: "A", color: "#FF9900" },
    { name: "Apple", letter: "⌘", color: "#555" },
    { name: "Docker", letter: "🐳", color: "#2496ED" },
    { name: "Express", letter: "Ex", color: "#000" },
    { name: "MasterCard", letter: "MC", color: "#eb001b" },
    { name: "Visa", letter: "VISA", color: "#1a1f71" },
    { name: "Stripe", letter: "S", color: "#635bff" },
    { name: "PayPal", letter: "PP", color: "#003087" },
  ];

  const stats = [
    { value: "50K+", label: "Happy Customers", icon: "😊" },
    { value: "10K+", label: "Products", icon: "🛍️" },
    { value: "500+", label: "Brands", icon: "🏷️" },
    { value: "4.9★", label: "Average Rating", icon: "⭐" },
  ];

  return (
    <section className="bg-white border-b border-gray-100">
      {/* Stats bar */}
      <div className="bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-4 xl:px-0 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center">
              <span className="text-xl mb-1">{s.icon}</span>
              <span className="text-2xl font-extrabold text-white">{s.value}</span>
              <span className="text-gray-400 text-xs mt-0.5">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trusted by brands */}
      <div className="max-w-7xl mx-auto px-4 xl:px-0 py-10">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-8">
          Trusted by world-class brands
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {brands.map((b) => (
            <div
              key={b.name}
              className="flex items-center justify-center w-20 h-10 grayscale hover:grayscale-0 opacity-40 hover:opacity-90 transition-all duration-300"
              title={b.name}
            >
              <span
                className="font-extrabold text-lg tracking-tight"
                style={{ color: b.color }}
              >
                {b.letter}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;