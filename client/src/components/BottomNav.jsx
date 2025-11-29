import { NavLink } from "react-router-dom";
import { Home, BookOpen, RotateCcw, User } from "lucide-react";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/aptitude", icon: BookOpen, label: "Practice" },
  { to: "/review", icon: RotateCcw, label: "Review" },
  { to: "/profile", icon: User, label: "Profile" }
];

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-around px-2 max-w-lg mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
            data-testid={`nav-${item.label.toLowerCase()}`}
          >
            {({ isActive }) => (
              <>
                <div className={`relative ${isActive ? "scale-110" : ""} transition-transform duration-200`}>
                  {isActive && (
                    <div className="absolute -inset-2 rounded-full bg-primary/20 blur-md" />
                  )}
                  <item.icon className={`h-5 w-5 relative z-10 ${isActive ? "stroke-[2.5px]" : ""}`} />
                </div>
                <span className={`text-xs font-medium ${isActive ? "font-semibold" : ""}`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default BottomNav;
