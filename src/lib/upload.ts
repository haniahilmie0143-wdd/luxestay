import { createClient } from "@/lib/supabase/client";

export async function uploadListingImage(
  file: File,
  listingId: string
): Promise<string> {
  const supabase = createClient();
  const ext = file.name.split(".").pop();
  const path = `${listingId}/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from("listing-images")
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage
    .from("listing-images")
    .getPublicUrl(path);

  return data.publicUrl;
}
