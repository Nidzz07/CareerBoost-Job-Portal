import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function BrandMark({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <motion.div
        whileHover={{ rotate: 12, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative"
      >
        <div className="absolute inset-0 gradient-primary rounded-xl blur-md opacity-50" />
        <div className="relative gradient-primary rounded-xl p-1.5 shadow-md">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
      </motion.div>
      {showText && (
        <span className="font-display text-xl font-bold tracking-tight text-gradient">Sakhi</span>
      )}
    </div>
  );
}
