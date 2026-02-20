"use client";

import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CONTACT_INFO = [
  {
    icon: Mail,
    title: "Email",
    description: "Our friendly team is here to help.",
    value: "support@glamora.com",
    color: "rose",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with us anytime, 24/7.",
    value: "Start new chat",
    color: "violet",
  },
  {
    icon: MapPin,
    title: "Office",
    description: "Come say hello at our office.",
    value: "Dhaka, Bangladesh",
    color: "amber",
  },
  {
    icon: Phone,
    title: "Phone",
    description: "Mon-Fri from 8am to 5pm.",
    value: "+880 1XXX-XXXXXX",
    color: "emerald",
  },
];

const COLOR_MAP: Record<string, { bg: string; text: string; iconBg: string }> =
  {
    rose: {
      bg: "bg-rose-50",
      text: "text-rose-500",
      iconBg: "bg-rose-100",
    },
    violet: {
      bg: "bg-violet-50",
      text: "text-violet-500",
      iconBg: "bg-violet-100",
    },
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-500",
      iconBg: "bg-amber-100",
    },
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-500",
      iconBg: "bg-emerald-100",
    },
  };

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon. 💌");
    setFormData({ firstName: "", lastName: "", email: "", message: "" });
  };

  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 xl:px-0 py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500 mb-1">
            Get in Touch
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            Chat with Our Team
          </h2>
          <p className="text-sm text-gray-400 mt-2 max-w-md">
            We&apos;d love to hear from you. Reach out through any channel or
            fill out the form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CONTACT_INFO.map((item) => {
              const colors = COLOR_MAP[item.color];
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:border-gray-200 transition-all duration-300"
                >
                  <div
                    className={`w-11 h-11 rounded-xl ${colors.iconBg} flex items-center justify-center mb-4`}
                  >
                    <item.icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <h3 className="text-base font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {item.description}
                  </p>
                  <p className={`mt-2 text-sm font-semibold ${colors.text}`}>
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Contact form */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    placeholder="John"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    placeholder="Doe"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="johndoe@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us how we can help…"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="group w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-rose-500 transition-all duration-300 shadow-lg hover:shadow-rose-200"
              >
                <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;