"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Globe, Star } from "lucide-react";

const cards = [
  {
    icon: Globe,
    title: "Global Reach",
    desc: "Properties in 180+ countries, curated for quality and exclusivity.",
    className: "col-span-1 row-span-1",
    gradient: "from-blue-500/10 to-purple-500/10",
  },
  {
    icon: Shield,
    title: "Verified & Secure",
    desc: "Every property is verified. Your payments are protected end-to-end.",
    className: "col-span-1 row-span-1",
    gradient: "from-green-500/10 to-emerald-500/10",
  },
  {
    icon: Star,
    title: "5-Star Quality",
    desc: "Only top-rated properties make it onto our platform.",
    className: "col-span-1 sm:col-span-2 row-span-1",
    gradient: "from-amber-500/10 to-orange-500/10",
  },
  {
    icon: Zap,
    title: "Instant Booking",
    desc: "Confirm your stay in seconds with real-time availability.",
    className: "col-span-1 row-span-1",
    gradient: "from-pink-500/10 to-rose-500/10",
  },
];

export function BentoStats() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`${card.className} glass rounded-2xl p-6 bg-gradient-to-br ${card.gradient} hover:border-white/20 transition-all duration-300 group`}
          >
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-white/15 transition">
              <card.icon className="h-5 w-5 text-amber-400" />
            </div>
            <h3 className="font-display font-semibold text-white text-lg mb-2">
              {card.title}
            </h3>
            <p className="text-white/50 text-sm leading-relaxed">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
