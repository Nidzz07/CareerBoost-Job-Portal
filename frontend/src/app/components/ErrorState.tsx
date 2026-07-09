import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({ title, description, onRetry }: ErrorStateProps) {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center rounded-3xl border border-destructive/30 bg-destructive/5 px-6 py-14 text-center"
    >
      <div className="rounded-2xl bg-destructive/10 p-4 mb-4">
        <AlertTriangle className="h-6 w-6 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold">{title ?? t("common.error_title")}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description ?? t("common.error_sub")}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="mt-6">
          {t("common.retry")}
        </Button>
      )}
    </motion.div>
  );
}
