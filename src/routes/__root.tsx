import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Cursor } from "@/components/experience/Cursor";
import { IntroLoader } from "@/components/experience/IntroLoader";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SmoothScroll } from "@/components/experience/SmoothScroll";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70svh] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="label-tech">404</p>
        <h1 className="display mt-6 text-4xl text-ivory">This page isn't in the archive.</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex border border-border px-6 py-4 text-[0.6875rem] uppercase tracking-[0.2em] text-ivory transition-colors hover:border-champagne"
          >
            Return to the studio
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70svh] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="display text-3xl text-ivory">Something interrupted the view.</h1>
        <p className="mt-4 text-sm text-muted-foreground">We couldn't load this experience.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="border border-border px-6 py-4 text-[0.6875rem] uppercase tracking-[0.2em] text-ivory transition-colors hover:border-champagne"
          >
            Try again
          </button>
          <a
            href="/"
            className="border border-hairline px-6 py-4 text-[0.6875rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-ivory"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Bambral 3D Studio | Jewelry CAD, 3D & Product Visualization" },
      {
        name: "description",
        content:
          "Premium jewelry CAD, 3D modeling, product visualization, animation and digital experiences for modern jewelry brands.",
      },
      { name: "author", content: "Bambral 3D Studio" },
      { property: "og:title", content: "Bambral 3D Studio | Jewelry CAD, 3D & Visualization" },
      {
        property: "og:description",
        content: "A jewelry CAD and 3D visualization studio — from idea to brilliance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0B0A09" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SmoothScroll>
          <IntroLoader />
          <Cursor />
          <Navbar />
          <main className="min-h-screen">
            {/* Required: nested routes render here. */}
            <Outlet />
          </main>
          <Footer />
          <Toaster />
        </SmoothScroll>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
