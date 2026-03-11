import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import { CartProvider } from "@/store/cart-store";
import * as React from "react";

export type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  // Provide client-side context (cart) and ensure AppHeader can react to client-side auth.
  // AppHeader already reads localStorage token; keep it rendered on client by marking this component as client.
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <AppHeader />
      <CartProvider>{children}</CartProvider>
      <AppFooter />
    </div>
  );
}

export default AppShell;
