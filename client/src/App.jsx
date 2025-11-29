import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import Aptitude from "./pages/Aptitude";
import DSA from "./pages/DSA";
import Review from "./pages/Review";
import Profile from "./pages/Profile";
import Quiz from "./pages/Quiz";
import NotFound from "./pages/not-found";

function App() {
  const location = useLocation();
  const isQuizPage = location.pathname.startsWith('/quiz');
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {!isQuizPage && <Header />}
      <main className={`flex-1 overflow-auto ${isQuizPage ? '' : 'pb-20'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aptitude" element={<Aptitude />} />
          <Route path="/dsa" element={<DSA />} />
          <Route path="/review" element={<Review />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/quiz/:type/:id" element={<Quiz />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isQuizPage && <BottomNav />}
    </div>
  );
}

export default App;
