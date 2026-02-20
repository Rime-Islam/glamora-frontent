"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQ_DATA = [
  {
    question: "What can I expect at my first visit?",
    answer:
      "When you first visit Glamora, you'll discover a curated marketplace of verified vendors offering authentic products. Browse categories, compare products, read reviews, and enjoy a seamless shopping experience with secure checkout.",
  },
  {
    question: "How does the multi-vendor marketplace work?",
    answer:
      "Glamora connects multiple verified vendors with customers in one seamless platform. Each vendor manages their own shop, products, and orders. You can browse products from different vendors, add items to your cart, and checkout in a single transaction.",
  },
  {
    question: "What is the return and refund policy?",
    answer:
      "We offer a hassle-free return policy. If you're not satisfied with your purchase, you can request a return within 7 days of delivery. Once the return is approved and the item is received, your refund will be processed within 3-5 business days.",
  },
  {
    question: "How can I become a vendor on Glamora?",
    answer:
      "To become a vendor, simply register as a vendor on our platform, set up your shop with your brand details and images, and start listing your products. Our team will review your application and get you started within 24 hours.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Absolutely. We use industry-standard encryption and partner with trusted payment gateways to ensure your financial information is always protected. We never store your payment details on our servers.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order is shipped, you'll receive a tracking number via email and can track your delivery status in real-time through your account dashboard. You'll also receive notifications at each delivery milestone.",
  },
];

const Frequently = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 xl:px-0 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500 mb-1">
            Got Questions?
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-gray-400 mt-2 max-w-lg mx-auto">
            Everything you need to know about Glamora. Can&apos;t find the
            answer? Feel free to contact our team.
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "border-rose-200 shadow-lg shadow-rose-50"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center gap-4 p-5 text-left"
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                      isOpen ? "bg-rose-50" : "bg-gray-50"
                    }`}
                  >
                    <HelpCircle
                      className={`w-4.5 h-4.5 transition-colors duration-300 ${
                        isOpen ? "text-rose-500" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <span
                    className={`flex-1 text-sm font-semibold transition-colors duration-300 ${
                      isOpen ? "text-gray-900" : "text-gray-700"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-rose-500" : ""
                    }`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-5 pl-[4.25rem]">
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Frequently;