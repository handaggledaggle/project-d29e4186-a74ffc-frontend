import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import { CartProvider } from "@/store/cart-store";
import * as React from "react";

export type AppShellProps = {
  children: React.ReactNode;
};

// Mark as client to ensure hooks and localStorage usage inside AppHeader and CartProvider are allowed
// and to prevent accidental multiple server/client nesting which can cause duplicated header renders
"use client";

export function AppShell({ children }: AppShellProps) {
  // Render a single AppHeader at top-level layout. Ensure AppShell is only used once (app/layout.tsx)
  // and avoid rendering AppHeader inside page-level components.
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <AppHeader />
      <CartProvider>{children}</CartProvider>
      <AppFooter />
    </div>
  );
}

export default AppShell;
