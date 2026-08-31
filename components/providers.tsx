"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/lib/auth-context";
import { DataProvider } from "@/lib/data-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <AuthProvider>
        <DataProvider>{children}</DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
