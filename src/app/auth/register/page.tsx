"use client";

import { useState } from "react";
import { signUp } from "@/actions/auth";
import Link from "next/link";
import { Building2, Loader2, Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await signUp(formData);
    if ("error" in result && result.error) {
      toast.error(result.error);
    } else if ("success" in result) {
      setSuccess(true);
      toast.success(result.success as string);
    }
    setLoading(false);
  }

  if (success) {
    return (
      <div className="min-h-screen mesh-bg flex items-center justify-center px-4">
        <div className="text-center glass rounded-2xl p-12 max-w-md w-full">
          <div className="w-16 h-16 rounded-full bg-green-400/20 flex items-center justify-center mx-auto mb-6">
            <Mail className="h-8 w-8 text-green-400" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-3">
            Check your email
          </h2>
          <p className="text-white/50 text-sm">
            We sent a confirmation link to your email address. Click it to
            activate your account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto mb-4">
            <Building2 className="h-6 w-6 text-black" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white">
            Create account
          </h1>
          <p className="text-white/50 text-sm mt-2">
            Join LuxeStay and discover extraordinary stays
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-4">
          <div>
            <label className="block text-white/60 text-xs font-medium mb-2">
              Full name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                name="full_name"
                type="text"
                required
                placeholder="Jane Doe"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-amber-400/50 transition"
              />
            </div>
          </div>

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
                placeholder="Min 8 characters"
                minLength={8}
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
            Create account
          </button>

          <p className="text-center text-white/40 text-sm">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-amber-400 hover:text-amber-300 transition"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
