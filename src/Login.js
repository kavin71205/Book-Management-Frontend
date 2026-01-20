import { useState } from "react";
const API_URL = "https://book-management-backend-rk86.onrender.com";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
  try {
    setLoading(true);

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      onLogin(data.token);
      alert("Login successful");
    } else {
      alert(data.message || "Login failed");
    }

  } catch (err) {
    alert("Server error");
  } finally {
    setLoading(false);
  }
};
  const handleSignup = async () => {
  try {
    setLoading(true);

    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Signup successful");
    } else {
      alert(data.message || "Signup failed");
    }

  } catch (err) {
    alert("Server error");
  } finally {
    setLoading(false);
  }
};

  return (
  <div className="flex justify-center mt-16">
    <div className="w-full max-w-2x1 bg-white rounded-xl shadow-md p-8">

      <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">
        Login Page
      </h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-6 px-4 py-2 border rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
  onClick={handleLogin}
  disabled={loading}
  className="w-full bg-blue-600 text-white py-2 rounded-lg"
>Login
</button>

      <button onClick={handleSignup} disabled={loading}
       className="w-full bg-blue-600 text-white py-2 rounded-lg mt-3"
>
      SignUp
      </button>

    </div>
    </div>
);
}