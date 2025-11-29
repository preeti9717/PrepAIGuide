import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Brain, Calculator, Lightbulb, Filter } from "lucide-react";
import { aptitudeQuestions } from "../data/questions";

const difficultyColors = {
  Easy: "bg-green-500/10 text-green-400 border-green-500/20",
  Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Hard: "bg-red-500/10 text-red-400 border-red-500/20"
};

const categoryIcons = {
  Quant: Calculator,
  Logical: Brain
};

const filterChips = ["All", "Quant", "Logical", "Easy", "Medium", "Hard"];

function Aptitude() {
  const [activeFilter, setActiveFilter] = useState("All");
  const navigate = useNavigate();
  
  const filteredQuestions = aptitudeQuestions.filter(q => {
    if (activeFilter === "All") return true;
    return q.category === activeFilter || q.difficulty === activeFilter;
  });
  
  const handleStartQuiz = (questionId) => {
    navigate(`/quiz/aptitude/${questionId}`);
  };

  return (
    <div className="px-4 py-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600">
            <Lightbulb className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight" data-testid="text-page-title">
              Aptitude Practice
            </h1>
            <p className="text-sm text-muted-foreground">
              Sharpen your quantitative and logical skills
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        {filterChips.map((chip) => (
          <button
            key={chip}
            onClick={() => setActiveFilter(chip)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeFilter === chip
                ? "bg-primary text-primary-foreground"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            }`}
            data-testid={`filter-${chip.toLowerCase()}`}
          >
            {chip}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredQuestions.map((question) => {
          const CategoryIcon = categoryIcons[question.category] || Brain;
          return (
            <div
              key={question.id}
              className="group rounded-xl border border-border bg-card p-5 hover-elevate transition-all duration-300"
              data-testid={`card-question-${question.id}`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50">
                    <CategoryIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">
                      {question.category}
                    </span>
                    <p className="text-xs text-muted-foreground/70">
                      {question.topic}
                    </p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${difficultyColors[question.difficulty]}`}>
                  {question.difficulty}
                </span>
              </div>
              
              <p className="text-sm font-medium leading-relaxed mb-4 line-clamp-3 min-h-[3.75rem]">
                {question.questionText}
              </p>
              
              <button
                onClick={() => handleStartQuiz(question.id)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary/10 text-primary font-medium text-sm transition-all hover:bg-primary hover:text-primary-foreground group-hover:bg-primary group-hover:text-primary-foreground"
                data-testid={`button-start-${question.id}`}
              >
                <span>Start</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Aptitude;
