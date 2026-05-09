"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/actions/auth";
import { Building2, LogOut, LayoutDashboard, PlusSquare, User } from "lucide-react";

export function Navbar() {
  const { user, loading } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center">
              <Building2 className="h-4 w-4 text-black" />
            </div>
            <span className="font-display font-bold text-white text-lg tracking-tight">
              Luxe<span className="text-amber-400">Stay</span>
            </span>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-2">
            {loading ? (
              <div className="w-20 h-8 rounded-lg bg-white/5 animate-pulse" />
            ) : user ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition text-sm"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/host/listings/new"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition text-sm"
                >
                  <PlusSquare className="h-4 w-4" />
                  List Property
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition text-sm"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
                <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/30 flex items-center justify-center">
                  <User className="h-4 w-4 text-amber-400" />
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition text-sm"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-1.5 rounded-lg bg-amber-400 text-black font-semibold hover:bg-amber-300 transition text-sm"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
