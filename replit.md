# Prep AI - Interview Preparation Platform

## Overview

Prep AI is an educational web application designed to help users prepare for technical interviews through practice with aptitude questions and data structures & algorithms (DSA) problems. The platform features progress tracking, personalized learning paths, and an engaging dark-themed UI.

The frontend is built with React + JavaScript (no TypeScript) using Vite, with a responsive mobile-first design.

## User Preferences

Preferred communication style: Simple, everyday language.
Tech preference: JavaScript only (no TypeScript in the app code)

## System Architecture

### Frontend Architecture

**Framework & Tooling**
- React 18+ with JavaScript (JSX) for component development
- Vite as the build tool and development server for fast HMR
- React Router DOM for client-side routing
- Tailwind CSS for utility-first styling

**File Structure**
- `client/src/main.jsx` - App entry point with BrowserRouter
- `client/src/App.jsx` - Main layout with Header, Routes, and BottomNav
- `client/src/pages/` - Page components (Home, Aptitude, DSA, Review, Profile)
- `client/src/components/` - Reusable components (Header, BottomNav, ProgressCircle)
- `client/src/data/questions.js` - Static dummy data for questions and stats

**UI Component System**
- Custom dark theme with indigo/purple accents
- Bottom navigation with 4 tabs (Home, Practice, Review, Profile)
- Progress circles with SVG gradients
- Card-based layouts with hover effects
- Responsive grid: mobile 1-column, tablet 2-column, desktop 3-column

**Design System**
- Dark theme: near-black background (#0f0f0f), elevated cards (#141414)
- Primary color: Indigo/purple gradient (hsl 250 75% 58%)
- Typography: Inter font family
- Spacing: Tailwind units (4, 6, 8 for consistent rhythm)

### Pages

1. **Home** (`/`)
   - Today's Plan checklist
   - Weekly Goals with ProgressCircle
   - Quick Practice buttons (Aptitude, DSA)
   - Streaks & Stats display

2. **Aptitude** (`/aptitude`)
   - Question cards with category, difficulty, preview
   - Filter chips (All, Quant, Logical, Easy, Medium, Hard)
   - Start button for each question

3. **DSA** (`/dsa`)
   - Topic cards (Arrays, Strings, Linked Lists, Trees, DP)
   - Progress bars per topic
   - Level badges (Beginner, Intermediate, Advanced)

4. **Review** (`/review`)
   - Recent attempts with correct/incorrect status
   - Weak areas with accuracy percentages

5. **Profile** (`/profile`)
   - User stats (solved, streak, accuracy, avg time)
   - Category progress (Aptitude vs DSA)
   - Preferences settings

### Data Structure

**Question Format** (for future backend compatibility):
```javascript
{
  id: "1",
  category: "Quant/Logical",
  topic: "Time & Work/Arrays",
  difficulty: "Easy/Medium/Hard",
  questionText: "Sample question...",
  options: ["A", "B", "C", "D"],
  correctOption: "B",
  explanation: "Short explanation..."
}
```

### Backend Architecture (Development)

- Express.js server serves Vite in development
- Static file serving for production builds
- Currently frontend-only; backend ready for future API routes

### Running the Application

```bash
npm install
npm run dev
```

The app runs on port 5000 with hot module replacement enabled.

## Recent Changes

- November 29, 2024: Initial implementation
  - Created JavaScript-only React frontend
  - Built all 5 pages with responsive dark theme
  - Added ProgressCircle SVG component
  - Implemented bottom navigation with React Router
  - Set up dummy data for questions and stats
