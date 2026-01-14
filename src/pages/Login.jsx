import bg from "../assets/5.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  // ✅ states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ login handler
 const handleLogin = async () => {
  if (!email || !password) {
    alert("All fields are required");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("LOGIN RESPONSE 👉", data);

    // ✅ THIS IS THE FIX (RIGHT HERE)
    if (data.success && data.token) {
      localStorage.setItem("token", data.token);
      navigate("/assistant");
    } else {
      alert("Login failed: token not received");
    }

  } catch (err) {
    console.error(err);
    alert("Server not reachable");
  }
};


  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-black/60 backdrop-blur-md p-8 rounded-xl w-full max-w-md text-white">

        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded bg-transparent border"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-transparent border"
          />

          {/* ✅ FIXED BUTTON */}
          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-blue-600 py-2 rounded"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-300">
          Don’t have an account?{" "}
          <Link to="/" className="text-blue-400 hover:underline">
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
