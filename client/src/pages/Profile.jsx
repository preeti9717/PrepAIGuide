import { User, Trophy, Flame, Target, Clock, TrendingUp, Settings, ChevronRight, BookOpen, Code2 } from "lucide-react";
import { userStats } from "../data/questions";
import ProgressCircle from "../components/ProgressCircle";

function Profile() {
  return (
    <div className="px-4 py-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600">
            <User className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight" data-testid="text-page-title">
              Profile
            </h1>
            <p className="text-sm text-muted-foreground">
              Your progress and preferences
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-border bg-card p-6" data-testid="card-user-info">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-green-500 border-2 border-card flex items-center justify-center">
                  <Flame className="h-3.5 w-3.5 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold" data-testid="text-user-name">Interview Prep User</h2>
                <p className="text-sm text-muted-foreground">Joined November 2024</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted/30">
                <Trophy className="h-5 w-5 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold" data-testid="text-total-solved">{userStats.totalSolved}</p>
                <p className="text-xs text-muted-foreground">Total Solved</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/30">
                <Flame className="h-5 w-5 text-orange-500 mx-auto mb-2" />
                <p className="text-2xl font-bold" data-testid="text-streak">{userStats.streak}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/30">
                <Target className="h-5 w-5 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold" data-testid="text-accuracy">{userStats.accuracy}%</p>
                <p className="text-xs text-muted-foreground">Accuracy</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/30">
                <Clock className="h-5 w-5 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold" data-testid="text-avg-time">{userStats.averageTime}</p>
                <p className="text-xs text-muted-foreground">Avg. Time</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6" data-testid="card-category-stats">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
              Category Progress
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">Aptitude</span>
                    <span className="text-sm text-muted-foreground">{userStats.aptitudeSolved} solved</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60"
                      style={{ width: `${(userStats.aptitudeSolved / userStats.totalSolved) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                  <Code2 className="h-5 w-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">DSA</span>
                    <span className="text-sm text-muted-foreground">{userStats.dsaSolved} solved</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-500/60"
                      style={{ width: `${(userStats.dsaSolved / userStats.totalSolved) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-xl border border-border bg-card p-6" data-testid="card-preferences">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5 text-muted-foreground" />
              Preferences
            </h3>
            
            <div className="space-y-2">
              {[
                { label: "Daily Goal", value: "8 questions" },
                { label: "Difficulty", value: "Medium" },
                { label: "Focus Area", value: "DSA" },
                { label: "Notifications", value: "Enabled" }
              ].map((pref, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer group"
                  data-testid={`pref-${pref.label.toLowerCase().replace(' ', '-')}`}
                >
                  <span className="text-sm text-muted-foreground">{pref.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{pref.value}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 mt-6" data-testid="card-weekly-progress">
            <h3 className="font-semibold text-lg mb-4">Weekly Progress</h3>
            <div className="flex justify-center">
              <ProgressCircle 
                percent={Math.round((userStats.weeklyCompleted / userStats.weeklyGoal) * 100)}
                size={140}
                strokeWidth={12}
                label="complete"
              />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              <span className="text-primary font-medium">{userStats.weeklyCompleted}</span> of {userStats.weeklyGoal} sections completed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
