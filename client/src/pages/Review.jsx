import { CheckCircle2, XCircle, Clock, AlertTriangle, RotateCcw, TrendingDown } from "lucide-react";
import { recentAttempts, weakAreas } from "../data/questions";

function Review() {
  return (
    <div className="px-4 py-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600">
            <RotateCcw className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight" data-testid="text-page-title">
              Review & Mistakes
            </h1>
            <p className="text-sm text-muted-foreground">
              Learn from your attempts and improve
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-card p-5" data-testid="card-recent-attempts">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-semibold text-lg">Recent Attempts</h2>
            </div>
            
            <div className="space-y-3">
              {recentAttempts.map((attempt) => (
                <div
                  key={attempt.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                    attempt.isCorrect
                      ? "bg-green-500/5 border-green-500/20"
                      : "bg-red-500/5 border-red-500/20"
                  }`}
                  data-testid={`attempt-${attempt.id}`}
                >
                  <div className={`flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full ${
                    attempt.isCorrect
                      ? "bg-green-500/20"
                      : "bg-red-500/20"
                  }`}>
                    {attempt.isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate" data-testid={`text-question-title-${attempt.id}`}>
                      {attempt.questionTitle}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-muted/50">
                        {attempt.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {attempt.date}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{attempt.timeTaken}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <div className="rounded-xl border border-border bg-card p-5" data-testid="card-weak-areas">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <h2 className="font-semibold text-lg">Weak Areas</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Focus on these topics to improve
            </p>
            
            <div className="space-y-3">
              {weakAreas.map((area) => (
                <div
                  key={area.id}
                  className="p-4 rounded-lg border border-amber-500/20 bg-amber-500/5"
                  data-testid={`weak-area-${area.id}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="font-medium text-sm">{area.name}</p>
                      <span className="text-xs text-muted-foreground">{area.category}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <TrendingDown className="h-4 w-4" />
                      <span className="text-sm font-medium">{area.accuracy}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted/50 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                      style={{ width: `${area.accuracy}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              className="w-full mt-4 px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:bg-muted/50 transition-colors"
              data-testid="button-review-all"
            >
              Review All Mistakes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
