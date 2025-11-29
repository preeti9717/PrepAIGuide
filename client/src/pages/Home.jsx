import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, Circle, Target, Flame, Trophy, BookOpen, Code2, ArrowRight, Zap, Timer, LogOut } from "lucide-react";
import ProgressCircle from "../components/ProgressCircle";
import { todaysPlan, userStats } from "../data/questions";
import { useState, useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    window.location.href = "/auth/logout";
  };

  return (
    <div className="px-4 py-6 max-w-6xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight" data-testid="text-welcome">
            Welcome {user?.displayName ? `back, ${user.displayName.split(' ')[0]}` : 'back'}
          </h2>
          <p className="text-muted-foreground mt-1">
            Ready to ace your interviews today?
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
          data-testid="button-logout"
        >
          <LogOut className="h-4 w-4" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        <div className="rounded-xl border border-border bg-card p-5 hover-elevate transition-all duration-300" data-testid="card-todays-plan">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Target className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Today's Plan</h3>
          </div>
          <div className="space-y-3">
            {todaysPlan.map((item) => {
              let onClick = null;
              if (item.task.includes("Aptitude")) {
                onClick = () => navigate("/aptitude");
              } else if (item.task.includes("DSA")) {
                onClick = () => navigate("/dsa");
              } else if (item.task.includes("Review")) {
                onClick = () => navigate("/review");
              }

              return (
                <button
                  key={item.id}
                  onClick={onClick}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${
                    item.completed 
                      ? "bg-green-500/10 text-green-400 cursor-default" 
                      : "bg-muted/50 hover:bg-muted/70 cursor-pointer"
                  }`}
                  data-testid={`task-${item.id}`}
                >
                  {item.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                  <span className={`text-sm font-medium ${item.completed ? "line-through opacity-70" : ""}`}>
                    {item.task}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 hover-elevate transition-all duration-300" data-testid="card-weekly-goals">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10">
              <Trophy className="h-4 w-4 text-purple-400" />
            </div>
            <h3 className="font-semibold text-lg">Weekly Goals</h3>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Goal: {userStats.weeklyGoal} sections this week</p>
              <p className="text-2xl font-bold">
                <span className="text-primary">{userStats.weeklyCompleted}</span>
                <span className="text-muted-foreground text-lg">/{userStats.weeklyGoal}</span>
                <span className="text-sm font-normal text-muted-foreground ml-2">completed</span>
              </p>
            </div>
            <ProgressCircle 
              percent={Math.round((userStats.weeklyCompleted / userStats.weeklyGoal) * 100)} 
              size={100} 
              strokeWidth={8}
            />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 hover-elevate transition-all duration-300" data-testid="card-quick-practice">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
              <Zap className="h-4 w-4 text-blue-400" />
            </div>
            <h3 className="font-semibold text-lg">Quick Practice</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Jump into a quick practice session
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              to="/aptitude"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-medium transition-all hover:opacity-90 active:scale-[0.98]"
              data-testid="button-aptitude"
            >
              <BookOpen className="h-4 w-4" />
              <span>Aptitude</span>
            </Link>
            <Link
              to="/dsa"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 text-white font-medium transition-all hover:opacity-90 active:scale-[0.98]"
              data-testid="button-dsa"
            >
              <Code2 className="h-4 w-4" />
              <span>DSA</span>
            </Link>
            <Link
              to="/timed"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium transition-all hover:opacity-90 active:scale-[0.98]"
              data-testid="button-timed"
            >
              <Timer className="h-4 w-4" />
              <span>Timed</span>
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 hover-elevate transition-all duration-300" data-testid="card-streaks-stats">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10">
              <Flame className="h-4 w-4 text-orange-400" />
            </div>
            <h3 className="font-semibold text-lg">Streaks & Stats</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20">
              <div className="flex items-center gap-2 mb-1">
                <Flame className="h-5 w-5 text-orange-500" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Streak</span>
              </div>
              <p className="text-3xl font-bold" data-testid="text-streak-count">
                {userStats.streak}
                <span className="text-sm font-normal text-muted-foreground ml-1">days</span>
              </p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="h-5 w-5 text-primary" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Solved</span>
              </div>
              <p className="text-3xl font-bold" data-testid="text-total-solved">
                {userStats.totalSolved}
                <span className="text-sm font-normal text-muted-foreground ml-1">total</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
