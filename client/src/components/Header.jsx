import { Sparkles } from "lucide-react";

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-center px-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/50 to-purple-500/50 opacity-75 blur-sm" />
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text" data-testid="text-app-title">
              Prep AI
            </h1>
            <span className="text-[10px] font-medium text-muted-foreground -mt-1" data-testid="text-app-subtitle">
              Interview Assistant
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
