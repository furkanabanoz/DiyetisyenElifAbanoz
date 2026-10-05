import { createClient } from "@/app/lib/supabase/client";

const BUCKET_NAME = "blog-images";

export async function uploadBlogImage(
  file: File
) {
  const supabase = createClient();

  const extension =
    file.name.split(".").pop()?.toLowerCase() ||
    "jpg";

  const fileName = `${crypto.randomUUID()}.${extension}`;

  const filePath = `blog/${fileName}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (error) {
    throw error;
  }

  const {
    data: publicUrlData,
  } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return {
    url: publicUrlData.publicUrl,
    path: filePath,
  };
}

