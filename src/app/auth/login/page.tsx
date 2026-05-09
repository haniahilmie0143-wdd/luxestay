"use client";

import { useState } from "react";
import { signIn } from "@/actions/auth";
import Link from "next/link";
import { Building2, Loader2, Mail, Lock } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await signIn(formData);
    if (result?.error) {
      toast.error(result.error);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto mb-4">
            <Building2 className="h-6 w-6 text-black" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white">
            Welcome back
          </h1>
          <p className="text-white/50 text-sm mt-2">
            Sign in to your LuxeStay account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-4">
          <div>
            <label className="block text-white/60 text-xs font-medium mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-amber-400/50 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-white/60 text-xs font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-amber-400/50 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-amber-400 text-black font-semibold hover:bg-amber-300 transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Sign in
          </button>

          <p className="text-center text-white/40 text-sm">
            No account?{" "}
            <Link
              href="/auth/register"
              className="text-amber-400 hover:text-amber-300 transition"
            >
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
