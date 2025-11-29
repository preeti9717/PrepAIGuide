import { Link, useNavigate } from "react-router-dom";
import { Code2, ArrowRight, CheckCircle2, Layers, Binary, Link2, TreeDeciduous, Workflow } from "lucide-react";
import { dsaTopics } from "../data/questions";
import { useState } from "react";

const levelColors = {
  Beginner: "bg-green-500/10 text-green-400 border-green-500/20",
  Intermediate: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Advanced: "bg-red-500/10 text-red-400 border-red-500/20"
};

const topicIcons = {
  Arrays: Layers,
  Strings: Binary,
  "Linked Lists": Link2,
  Trees: TreeDeciduous,
  "Dynamic Programming": Workflow
};

function DSA() {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handlePracticeTopic = (topicName) => {
    setSelectedTopic(topicName);
    navigate(`/dsa?topic=${encodeURIComponent(topicName)}`);
  };
  return (
    <div className="px-4 py-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-600">
            <Code2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight" data-testid="text-page-title">
              DSA Practice
            </h1>
            <p className="text-sm text-muted-foreground">
              Master data structures and algorithms
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dsaTopics.map((topic) => {
          const TopicIcon = topicIcons[topic.name] || Code2;
          const progress = Math.round((topic.completedCount / topic.problemCount) * 100);
          
          return (
            <div
              key={topic.id}
              className="group rounded-xl border border-border bg-card p-5 hover-elevate transition-all duration-300"
              data-testid={`card-topic-${topic.id}`}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20">
                  <TopicIcon className="h-6 w-6 text-purple-400" />
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${levelColors[topic.level]}`}>
                  {topic.level}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold mb-2" data-testid={`text-topic-name-${topic.id}`}>
                {topic.name}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[2.5rem]">
                {topic.description}
              </p>
              
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">
                    <span className="text-primary">{topic.completedCount}</span>
                    <span className="text-muted-foreground">/{topic.problemCount}</span>
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              
              <button
                onClick={() => handlePracticeTopic(topic.name)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-purple-500/10 text-purple-400 font-medium text-sm transition-all hover:bg-purple-500 hover:text-white group-hover:bg-purple-500 group-hover:text-white"
                data-testid={`button-practice-${topic.id}`}
              >
                <span>Practice</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DSA;
