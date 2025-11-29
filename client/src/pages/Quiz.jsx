import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle, Lightbulb, Clock, ArrowRight, RotateCcw } from "lucide-react";
import { aptitudeQuestions, dsaTopics } from "../data/questions";

const difficultyColors = {
  Easy: "bg-green-500/10 text-green-400 border-green-500/20",
  Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Hard: "bg-red-500/10 text-red-400 border-red-500/20"
};

function Quiz() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  
  const question = type === "aptitude" 
    ? aptitudeQuestions.find(q => q.id === id)
    : null;

  useEffect(() => {
    let interval;
    if (timerActive && !isSubmitted) {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, isSubmitted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (option) => {
    if (!isSubmitted) {
      setSelectedAnswer(option);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer && !isSubmitted) {
      setIsSubmitted(true);
      setTimerActive(false);
      setIsCorrect(selectedAnswer === question.correctOption);
    }
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowExplanation(false);
    setTimeSpent(0);
    setTimerActive(true);
  };

  const handleNextQuestion = () => {
    const currentIndex = aptitudeQuestions.findIndex(q => q.id === id);
    const nextQuestion = aptitudeQuestions[currentIndex + 1];
    if (nextQuestion) {
      navigate(`/quiz/aptitude/${nextQuestion.id}`);
      handleRetry();
    } else {
      navigate('/aptitude');
    }
  };

  if (!question) {
    return (
      <div className="px-4 py-6 max-w-3xl mx-auto">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Question not found</h2>
          <p className="text-muted-foreground mb-6">This question doesn't exist or has been removed.</p>
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
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back</span>
        </button>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-mono font-medium" data-testid="text-timer">
              {formatTime(timeSpent)}
            </span>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${difficultyColors[question.difficulty]}`}>
            {question.difficulty}
          </span>
        </div>
      </div>

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

      {!isSubmitted && (
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
                  <span className="text-lg font-semibold text-red-400">Incorrect</span>
                </>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Time taken: {formatTime(timeSpent)}
            </p>
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

          <div className="flex gap-3">
            <button
              onClick={handleRetry}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors font-medium"
              data-testid="button-retry"
            >
              <RotateCcw className="h-4 w-4" />
              Try Again
            </button>
            <button
              onClick={handleNextQuestion}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all font-medium"
              data-testid="button-next"
            >
              Next Question
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
