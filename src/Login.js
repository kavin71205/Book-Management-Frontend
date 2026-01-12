import { useState } from "react";
import { loginUser } from "./api";
import { signup } from "./api";


export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const res = await loginUser(email, password);
    if (res.token) {
      localStorage.setItem("token", res.token);
      onLogin(res.token);
    } else {
      alert("Login failed");
    }
  }
  async function handleSignup() {
  try {
    await signup(email, password); 
    alert("Signup successful. Please login.");
  } catch (err) {
    alert("Signup failed");
  }
}

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
        className="w-full bg-blue-600 text-white py-2 rounded-lg
                   font-medium hover:bg-blue-700 transition"
      >
        Login
      </button>

      <button onClick={handleSignup}
        className="w-full bg-blue-600 text-white py-2 rounded-lg mt-3
                   font-medium hover:bg-blue-700 transition"
      >
        SignUp
      </button>

    </div>
  </div>
);
}