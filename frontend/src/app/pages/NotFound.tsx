import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="relative min-h-dvh flex items-center justify-center px-6 bg-background overflow-hidden">
      <div className="absolute inset-0 gradient-hero pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-center max-w-md"
      >
        <div className="text-8xl sm:text-9xl font-bold text-gradient animate-gradient bg-clip-text">404</div>
        <h1 className="mt-4 text-2xl sm:text-3xl font-bold">This page took a coffee break.</h1>
        <p className="mt-3 text-muted-foreground">
          Let's get you back to somewhere useful.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="rounded-full gradient-primary text-primary-foreground shadow-glow">
            <Link to="/"><Home className="h-4 w-4 mr-1" /> Go home</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="/app/dashboard"><ArrowLeft className="h-4 w-4 mr-1" /> Dashboard</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
