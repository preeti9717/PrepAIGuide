import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle, Lightbulb, Clock, ArrowRight, RotateCcw, Timer, AlertTriangle, Trophy, Target, Zap } from "lucide-react";
import { aptitudeQuestions } from "../data/questions";

const difficultyColors = {
  Easy: "bg-green-500/10 text-green-400 border-green-500/20",
  Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Hard: "bg-red-500/10 text-red-400 border-red-500/20"
};

const timerPresets = [
  { label: "30s", value: 30 },
  { label: "1 min", value: 60 },
  { label: "2 min", value: 120 },
  { label: "5 min", value: 300 },
];

function TimedPractice() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [sessionStarted, setSessionStarted] = useState(false);
  const [timerDuration, setTimerDuration] = useState(60);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0, total: 0 });
  const [sessionComplete, setSessionComplete] = useState(false);
  const [timeExpired, setTimeExpired] = useState(false);

  const category = searchParams.get('category') || 'all';
  
  const filteredQuestions = category === 'all' 
    ? aptitudeQuestions 
    : aptitudeQuestions.filter(q => q.category === category);
  
  const question = filteredQuestions[questionIndex];

  const handleAutoSubmit = useCallback(() => {
    if (!isSubmitted && question) {
      setIsSubmitted(true);
      setTimeExpired(true);
      setIsCorrect(false);
      setSessionStats(prev => ({
        ...prev,
        incorrect: prev.incorrect + 1,
        total: prev.total + 1
      }));
    }
  }, [isSubmitted, question]);

  useEffect(() => {
    let interval;
    if (sessionStarted && !isSubmitted && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionStarted, isSubmitted, handleAutoSubmit]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    const percentage = (timeRemaining / timerDuration) * 100;
    if (percentage > 50) return "text-green-400";
    if (percentage > 25) return "text-amber-400";
    return "text-red-400 animate-pulse";
  };

  const handleStartSession = () => {
    setSessionStarted(true);
    setTimeRemaining(timerDuration);
    setQuestionIndex(0);
    setSessionStats({ correct: 0, incorrect: 0, total: 0 });
  };

  const handleSelectAnswer = (option) => {
    if (!isSubmitted) {
      setSelectedAnswer(option);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer && !isSubmitted) {
      setIsSubmitted(true);
      const correct = selectedAnswer === question.correctOption;
      setIsCorrect(correct);
      setSessionStats(prev => ({
        correct: prev.correct + (correct ? 1 : 0),
        incorrect: prev.incorrect + (correct ? 0 : 1),
        total: prev.total + 1
      }));
    }
  };

  const handleNextQuestion = () => {
    if (questionIndex + 1 < filteredQuestions.length) {
      setQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
      setIsCorrect(false);
      setShowExplanation(false);
      setTimeExpired(false);
      setTimeRemaining(timerDuration);
    } else {
      setSessionComplete(true);
    }
  };

  const handleRestartSession = () => {
    setSessionStarted(false);
    setSessionComplete(false);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowExplanation(false);
    setTimeExpired(false);
    setTimeRemaining(timerDuration);
    setSessionStats({ correct: 0, incorrect: 0, total: 0 });
  };

  if (!sessionStarted) {
    return (
      <div className="px-4 py-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Timer className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Timed Practice</h1>
          <p className="text-muted-foreground">Challenge yourself with time-limited questions</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 mb-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Time per Question
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {timerPresets.map((preset) => (
              <button
                key={preset.value}
                onClick={() => setTimerDuration(preset.value)}
                className={`py-3 px-4 rounded-lg border font-medium transition-all ${
                  timerDuration === preset.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted/30 border-border hover:bg-muted/50"
                }`}
                data-testid={`timer-preset-${preset.value}`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 mb-6">
          <h3 className="font-semibold mb-3">Session Info</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Questions available:</span>
              <span className="font-medium text-foreground">{filteredQuestions.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Time limit per question:</span>
              <span className="font-medium text-foreground">{formatTime(timerDuration)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Auto-submit:</span>
              <span className="font-medium text-amber-400">When time expires</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleStartSession}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all"
          data-testid="button-start-session"
        >
          <Zap className="h-5 w-5" />
          Start Timed Practice
        </button>
      </div>
    );
  }

  if (sessionComplete) {
    const accuracy = sessionStats.total > 0 
      ? Math.round((sessionStats.correct / sessionStats.total) * 100) 
      : 0;

    return (
      <div className="px-4 py-6 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-4">
            <Trophy className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Session Complete!</h1>
          <p className="text-muted-foreground">Great job completing your timed practice</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">{sessionStats.correct}</div>
            <div className="text-sm text-muted-foreground">Correct</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <div className="text-3xl font-bold text-red-400 mb-1">{sessionStats.incorrect}</div>
            <div className="text-sm text-muted-foreground">Incorrect</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <div className="text-3xl font-bold text-primary mb-1">{accuracy}%</div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Target className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Performance Summary</h3>
          </div>
          <div className="w-full bg-muted rounded-full h-3 mb-2">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-primary to-purple-500 transition-all"
              style={{ width: `${accuracy}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            You answered {sessionStats.correct} out of {sessionStats.total} questions correctly
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleRestartSession}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors font-medium"
            data-testid="button-restart"
          >
            <RotateCcw className="h-4 w-4" />
            Practice Again
          </button>
          <Link
            to="/aptitude"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all font-medium"
            data-testid="link-back-practice"
          >
            Back to Practice
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="px-4 py-6 max-w-3xl mx-auto">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No questions available</h2>
          <p className="text-muted-foreground mb-6">Try selecting a different category.</p>
          <Link 
            to="/aptitude"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Practice
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Question {questionIndex + 1} of {filteredQuestions.length}
          </span>
          <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all"
              style={{ width: `${((questionIndex + 1) / filteredQuestions.length) * 100}%` }}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
            timeRemaining <= 10 ? "bg-red-500/10 border border-red-500/20" : "bg-muted/50"
          }`}>
            <Clock className={`h-4 w-4 ${getTimerColor()}`} />
            <span className={`text-sm font-mono font-bold ${getTimerColor()}`} data-testid="text-timer">
              {formatTime(timeRemaining)}
            </span>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${difficultyColors[question.difficulty]}`}>
            {question.difficulty}
          </span>
        </div>
      </div>

      {timeExpired && (
        <div className="mb-4 flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-sm font-medium">Time's up! Answer marked as incorrect.</span>
        </div>
      )}

      <div className="rounded-xl border border-border bg-card p-6 mb-6" data-testid="card-question">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-medium text-muted-foreground px-2 py-1 rounded-full bg-muted/50">
            {question.category}
          </span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{question.topic}</span>
        </div>
        
        <h2 className="text-lg font-semibold leading-relaxed mb-6" data-testid="text-question">
          {question.questionText}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrectAnswer = option === question.correctOption;
            
            let optionClasses = "w-full flex items-center gap-3 p-4 rounded-lg border transition-all text-left ";
            
            if (isSubmitted) {
              if (isCorrectAnswer) {
                optionClasses += "bg-green-500/10 border-green-500/30 text-green-400";
              } else if (isSelected && !isCorrect) {
                optionClasses += "bg-red-500/10 border-red-500/30 text-red-400";
              } else {
                optionClasses += "bg-muted/30 border-border/50 text-muted-foreground";
              }
            } else {
              if (isSelected) {
                optionClasses += "bg-primary/10 border-primary/50 text-foreground";
              } else {
                optionClasses += "bg-muted/30 border-border hover:bg-muted/50 hover:border-border/80 cursor-pointer";
              }
            }
            
            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(option)}
                disabled={isSubmitted}
                className={optionClasses}
                data-testid={`option-${index}`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  isSubmitted && isCorrectAnswer
                    ? "bg-green-500 text-white"
                    : isSubmitted && isSelected && !isCorrect
                    ? "bg-red-500 text-white"
                    : isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="flex-1 text-sm font-medium">{option}</span>
                {isSubmitted && isCorrectAnswer && (
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                )}
                {isSubmitted && isSelected && !isCorrect && (
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {!isSubmitted && !timeExpired && (
        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          className={`w-full py-3 rounded-lg font-medium transition-all ${
            selectedAnswer
              ? "bg-primary text-primary-foreground hover:opacity-90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
          data-testid="button-submit"
        >
          Submit Answer
        </button>
      )}

      {isSubmitted && (
        <div className="space-y-4">
          <div className={`rounded-xl p-4 ${
            isCorrect 
              ? "bg-green-500/10 border border-green-500/20" 
              : "bg-red-500/10 border border-red-500/20"
          }`} data-testid="result-banner">
            <div className="flex items-center gap-3 mb-2">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                  <span className="text-lg font-semibold text-green-400">Correct!</span>
                </>
              ) : (
                <>
                  <XCircle className="h-6 w-6 text-red-500" />
                  <span className="text-lg font-semibold text-red-400">
                    {timeExpired ? "Time Expired!" : "Incorrect"}
                  </span>
                </>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Score: {sessionStats.correct}/{sessionStats.total}</span>
              <span>•</span>
              <span>Accuracy: {sessionStats.total > 0 ? Math.round((sessionStats.correct / sessionStats.total) * 100) : 0}%</span>
            </div>
          </div>

          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="w-full flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors"
            data-testid="button-explanation"
          >
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-400" />
              <span className="font-medium">View Explanation</span>
            </div>
            <ArrowRight className={`h-4 w-4 text-muted-foreground transition-transform ${showExplanation ? "rotate-90" : ""}`} />
          </button>

          {showExplanation && (
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4" data-testid="explanation-content">
              <p className="text-sm leading-relaxed">{question.explanation}</p>
            </div>
          )}

          <button
            onClick={handleNextQuestion}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all font-medium"
            data-testid="button-next"
          >
            {questionIndex + 1 < filteredQuestions.length ? (
              <>
                Next Question
                <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              <>
                Finish Session
                <Trophy className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default TimedPractice;
