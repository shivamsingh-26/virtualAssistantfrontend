import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import bg from "../assets/5.jpeg";

function Signup() {
  const navigate = useNavigate();

  // ✅ states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  // ✅ signup handler
  const handleSignup = async () => {
    // frontend validation
    if (!firstName || !lastName || !email || !password || !confirmpassword) {
      alert("All fields are required");
      return;
    }

    if (password !== confirmpassword) {
      alert("Passwords do not match");
      return;
    }

    // backend call
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        confirmpassword,
      }),
    });

    const data = await res.json();

    if (data.success) {
      navigate("/assistant");
    } else {
      alert(data.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-black/60 backdrop-blur-md p-8 rounded-xl w-full max-w-md text-white">

        <h1 className="text-3xl font-bold text-center mb-6">
          Create Your Account
        </h1>

        <form className="space-y-4">
          <div className="flex gap-3">
            <input
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-1/2 px-4 py-2 rounded bg-transparent border"
            />
            <input
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-1/2 px-4 py-2 rounded bg-transparent border"
            />
          </div>

          <input
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

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-transparent border"
          />

          {/* ✅ FIXED BUTTON */}
          <button
            type="button"
            onClick={handleSignup}
            className="w-full bg-blue-600 py-2 rounded font-semibold"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;
