import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Aptitude from "./pages/Aptitude";
import DSA from "./pages/DSA";
import Review from "./pages/Review";
import Profile from "./pages/Profile";
import Quiz from "./pages/Quiz";
import TimedPractice from "./pages/TimedPractice";
import NotFound from "./pages/not-found";

function App() {
  const location = useLocation();
  const isQuizPage = location.pathname.startsWith('/quiz') || location.pathname.startsWith('/timed');
  const isAuthPage = location.pathname === '/';
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {!isQuizPage && !isAuthPage && <Header />}
      <main className={`flex-1 overflow-auto ${isQuizPage || isAuthPage ? '' : 'pb-20'}`}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/aptitude"
            element={
              <ProtectedRoute>
                <Aptitude />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dsa"
            element={
              <ProtectedRoute>
                <DSA />
              </ProtectedRoute>
            }
          />
          <Route
            path="/review"
            element={
              <ProtectedRoute>
                <Review />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/quiz/:type/:id" element={<Quiz />} />
          <Route path="/timed" element={<TimedPractice />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isQuizPage && !isAuthPage && <BottomNav />}
    </div>
  );
}

export default App;
