import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";

export type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <AppHeader />
      {children}
      <AppFooter />
    </div>
  );
}

export default AppShell;
