import "./App.css";
import "./tailwind.css";
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProfile } from "@/services/auth.service";
import AppRoutes from "@/routes/auth.route";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getProfile(); // API untuk cek token
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <AppRoutes
          isAuthenticated={isAuthenticated}
          onLoginSuccess={handleLoginSuccess}
          onLogout={handleLogout}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
