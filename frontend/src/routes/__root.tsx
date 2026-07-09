import { createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import { type QueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import { App } from "../app/App";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#7C3AED" },
      { title: "Sakhi — AI-powered livelihood platform for women" },
      {
        name: "description",
        content:
          "Learn new skills, earn a livelihood, and flourish. Sakhi is an AI-powered platform helping women unlock courses, jobs, and marketplace opportunities.",
      },
      { property: "og:title", content: "Sakhi — Learn. Earn. Flourish." },
      {
        property: "og:description",
        content: "An elegant AI-powered platform helping women learn skills, find jobs and grow their businesses.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,800&family=Inter:wght@400;500;600;700;800&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: App,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
