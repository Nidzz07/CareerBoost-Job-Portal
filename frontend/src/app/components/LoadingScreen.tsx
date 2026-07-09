import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative">
          <div className="absolute inset-0 gradient-primary rounded-2xl blur-2xl opacity-60 animate-pulse" />
          <div className="relative gradient-primary rounded-2xl p-4 shadow-glow">
            <Sparkles className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">Preparing your journey…</p>
      </motion.div>
    </div>
  );
}
