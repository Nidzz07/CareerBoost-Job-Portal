import { useEffect, useState, type ReactNode } from "react";
import { AppClient } from "./AppClient";

function Shell() {
  return (
    <div
      className="min-h-dvh"
      style={{ background: "var(--color-background)" }}
      aria-hidden="true"
    />
  );
}

function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <Shell />;
  return <>{children}</>;
}

export function App() {
  return (
    <ClientOnly>
      <AppClient />
    </ClientOnly>
  );
}
