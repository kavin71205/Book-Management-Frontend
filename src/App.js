import { useEffect, useState } from "react";
import Login from "./Login";
import Books from "./Books";

export default function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center pt-10">
      <div className="w-full max-w-xl bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Book App
        </h1>

        {!token ? (
          <Login onLogin={setToken} />
        ) : (
          <Books token={token} onLogout={handleLogout} />
        )}
      </div>
    </div>
  );
}
