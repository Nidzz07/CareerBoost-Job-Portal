import { useTranslation } from "react-i18next";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

const langs = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "mr", label: "मराठी" },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = langs.find((l) => l.code === i18n.language) ?? langs[0];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="rounded-full gap-2">
          <Languages className="h-4 w-4" />
          <span className="hidden sm:inline">{current.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-2xl">
        {langs.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => void i18n.changeLanguage(l.code)}
            className="rounded-lg cursor-pointer"
          >
            {l.label}
            {i18n.language === l.code && <span className="ml-auto text-primary">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
