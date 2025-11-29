function ProgressCircle({ percent = 0, size = 120, strokeWidth = 10, label = "" }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percent / 100) * circumference;
  
  return (
    <div className="relative inline-flex items-center justify-center" data-testid="progress-circle">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="rgb(168, 85, 247)" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/30"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold tracking-tight" data-testid="text-progress-percent">
          {percent}%
        </span>
        {label && (
          <span className="text-xs text-muted-foreground font-medium mt-0.5">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

export default ProgressCircle;
