import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { HostDashboard } from "@/components/dashboard/HostDashboard";
import { GuestDashboard } from "@/components/dashboard/GuestDashboard";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen mesh-bg pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-white">
            Welcome back{profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}
          </h1>
          <p className="text-white/50 text-sm mt-1">
            {profile?.is_host ? "Host Dashboard" : "Your bookings and account"}
          </p>
        </div>

        {profile?.is_host ? <HostDashboard /> : <GuestDashboard />}
      </div>
    </div>
  );
}
