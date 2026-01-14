import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AssistantName() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  // 🔒 PROTECT ROUTE (FIXED)
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-black flex flex-col items-center justify-center text-white">
      
      <h1 className="text-2xl mb-6">Enter Your Assistant Name</h1>

      <input
        type="text"
        placeholder="e.g. Jarvis"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-96 px-6 py-3 rounded-full bg-transparent border border-gray-400 text-center focus:outline-none"
      />

      <button
        type="button"
        disabled={!name.trim()}
        onClick={() => {
          const trimmedName = name.trim();
          localStorage.setItem("assistantName", trimmedName);
          navigate("/chat");
        }}
        className="mt-6 px-10 py-3 rounded-full bg-white text-black disabled:opacity-50 cursor-pointer"
      >
        Finally Create Your Assistant
      </button>

    </div>
  );
}

export default AssistantName;
