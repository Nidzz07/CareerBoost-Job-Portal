import { useRef, useState } from "react";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadApi } from "@/app/services/api/endpoints";
import { unwrapError } from "@/app/services/api/client";

/**
 * Reusable file/image uploader (Phase 0 foundation). Uploads through the shared
 * uploadApi and returns the stored URL via `onUploaded`. Feature pages (Learn media,
 * Marketplace product images, Profile avatar) will consume this in later phases — it
 * is intentionally not wired anywhere yet.
 */
export function ImageUploader({
  onUploaded,
  accept = "image/*",
  label = "Upload image",
  disabled = false,
  className,
}: {
  onUploaded: (url: string) => void;
  accept?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await uploadApi.upload(file);
      onUploaded(result.url);
      toast.success("Uploaded");
    } catch (err) {
      toast.error(unwrapError(err).message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />
      <Button
        type="button"
        variant="outline"
        disabled={disabled || uploading}
        onClick={() => inputRef.current?.click()}
        className="rounded-full"
      >
        <Upload className="h-4 w-4 mr-1" /> {uploading ? "Uploading…" : label}
      </Button>
    </div>
  );
}
