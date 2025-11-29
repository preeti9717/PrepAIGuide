export const aptitudeQuestions = [
  {
    id: "1",
    category: "Quant",
    topic: "Time & Work",
    difficulty: "Easy",
    questionText: "If A can complete a task in 12 days and B can complete it in 18 days, how many days will they take working together?",
    options: ["6.5 days", "7.2 days", "8.4 days", "9 days"],
    correctOption: "7.2 days",
    explanation: "Combined work rate = 1/12 + 1/18 = 5/36. Time = 36/5 = 7.2 days"
  },
  {
    id: "2",
    category: "Logical",
    topic: "Blood Relations",
    difficulty: "Medium",
    questionText: "Pointing to a photograph, a man said, 'She is the daughter of my grandfather's only son.' How is the woman in the photograph related to him?",
    options: ["Mother", "Sister", "Aunt", "Daughter"],
    correctOption: "Sister",
    explanation: "Grandfather's only son is the man's father. The daughter of his father is his sister."
  },
  {
    id: "3",
    category: "Quant",
    topic: "Percentages",
    difficulty: "Easy",
    questionText: "A product's price is increased by 20% and then decreased by 20%. What is the net change in price?",
    options: ["No change", "4% decrease", "4% increase", "2% decrease"],
    correctOption: "4% decrease",
    explanation: "Net effect = 1.2 × 0.8 = 0.96, which is a 4% decrease from original."
  },
  {
    id: "4",
    category: "Logical",
    topic: "Coding-Decoding",
    difficulty: "Medium",
    questionText: "If COMPUTER is coded as RFUVQNPC, how is MACHINE coded?",
    options: ["FOJDBNI", "ENIHCAM", "LZHMCOD", "NBDIJOF"],
    correctOption: "ENIHCAM",
    explanation: "The word is reversed. MACHINE reversed is ENIHCAM."
  },
  {
    id: "5",
    category: "Quant",
    topic: "Profit & Loss",
    difficulty: "Hard",
    questionText: "A shopkeeper marks his goods 30% above cost price but allows 15% discount. What is his profit percentage?",
    options: ["10.5%", "12%", "15%", "18%"],
    correctOption: "10.5%",
    explanation: "SP = 1.30 × 0.85 = 1.105 times CP. Profit = 10.5%"
  },
  {
    id: "6",
    category: "Logical",
    topic: "Syllogisms",
    difficulty: "Hard",
    questionText: "All roses are flowers. Some flowers are red. Conclusion: Some roses are red. Is this valid?",
    options: ["Yes, definitely true", "No, definitely false", "Cannot be determined", "Partially true"],
    correctOption: "Cannot be determined",
    explanation: "The conclusion doesn't follow logically. Not all flowers that are red are necessarily roses."
  },
  {
    id: "7",
    category: "Quant",
    topic: "Speed & Distance",
    difficulty: "Medium",
    questionText: "A train 150m long passes a pole in 15 seconds. What is its speed in km/hr?",
    options: ["32 km/hr", "36 km/hr", "40 km/hr", "45 km/hr"],
    correctOption: "36 km/hr",
    explanation: "Speed = 150/15 = 10 m/s = 10 × 18/5 = 36 km/hr"
  },
  {
    id: "8",
    category: "Logical",
    topic: "Series Completion",
    difficulty: "Easy",
    questionText: "Complete the series: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "46"],
    correctOption: "42",
    explanation: "Differences: 4, 6, 8, 10, 12. Next number = 30 + 12 = 42"
  }
];

export const dsaTopics = [
  {
    id: "1",
    name: "Arrays",
    level: "Beginner",
    problemCount: 45,
    completedCount: 28,
    description: "Master array manipulation, two-pointer techniques, and sliding window patterns."
  },
  {
    id: "2",
    name: "Strings",
    level: "Beginner",
    problemCount: 38,
    completedCount: 22,
    description: "String operations, pattern matching, and common interview problems."
  },
  {
    id: "3",
    name: "Linked Lists",
    level: "Intermediate",
    problemCount: 32,
    completedCount: 15,
    description: "Singly and doubly linked lists, reversal, cycle detection, and merging."
  },
  {
    id: "4",
    name: "Trees",
    level: "Intermediate",
    problemCount: 42,
    completedCount: 18,
    description: "Binary trees, BST operations, traversals, and tree-based algorithms."
  },
  {
    id: "5",
    name: "Dynamic Programming",
    level: "Advanced",
    problemCount: 55,
    completedCount: 12,
    description: "Memoization, tabulation, and classic DP patterns for optimization."
  }
];

export const recentAttempts = [
  {
    id: "1",
    questionTitle: "Two Sum Problem",
    category: "Arrays",
    isCorrect: true,
    date: "2024-01-15",
    timeTaken: "4:32"
  },
  {
    id: "2",
    questionTitle: "Blood Relations - Complex",
    category: "Logical",
    isCorrect: false,
    date: "2024-01-15",
    timeTaken: "6:15"
  },
  {
    id: "3",
    questionTitle: "Percentage Calculations",
    category: "Quant",
    isCorrect: true,
    date: "2024-01-14",
    timeTaken: "2:48"
  },
  {
    id: "4",
    questionTitle: "Reverse Linked List",
    category: "Linked Lists",
    isCorrect: true,
    date: "2024-01-14",
    timeTaken: "8:20"
  },
  {
    id: "5",
    questionTitle: "Syllogism Advanced",
    category: "Logical",
    isCorrect: false,
    date: "2024-01-13",
    timeTaken: "5:45"
  }
];

export const weakAreas = [
  { id: "1", name: "Syllogisms", category: "Logical", accuracy: 45 },
  { id: "2", name: "Blood Relations", category: "Logical", accuracy: 52 },
  { id: "3", name: "Dynamic Programming", category: "DSA", accuracy: 38 }
];

export const userStats = {
  totalSolved: 120,
  streak: 4,
  aptitudeSolved: 68,
  dsaSolved: 52,
  weeklyGoal: 5,
  weeklyCompleted: 3,
  accuracy: 76,
  averageTime: "4:25"
};

export const todaysPlan = [
  { id: "1", task: "5 Aptitude Questions", completed: true },
  { id: "2", task: "3 DSA Problems", completed: false },
  { id: "3", task: "Review Mistakes", completed: false }
];
