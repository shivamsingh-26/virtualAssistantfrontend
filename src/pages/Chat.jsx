






console.log("Chat component rendered");


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Chat() {
  const navigate = useNavigate();

  // 🔒 Protect route (FIXED)
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  // 🧠 states
  const [started, setStarted] = useState(false);
  const [userText, setUserText] = useState("");
  const [assistantText, setAssistantText] = useState("");

  // 🔊 load voices (FIXED)
  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      speechSynthesis.getVoices();
    };
  }, []);

  // 🔍 detect hindi
  const isHindi = (text) => /[\u0900-\u097F]/.test(text);

  // 🔊 speak function
  const speak = (text, lang = "en-IN") => {
    if (!text) return;

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 1;
    utterance.pitch = 1;

    speechSynthesis.speak(utterance);
  };

  // ▶ start assistant
  const startAssistant = () => {
    setStarted(true);
    const greeting =
      "Hello dost! Main tumhara assistant hoon. Batao main kya madad kar sakta hoon?";
    setAssistantText(greeting);
    speak(greeting, "hi-IN");
  };

  // 🎤 speech to text
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";

    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript.toLowerCase();
      setUserText(text);
      handleCommand(text);
    };

    recognition.start();
  };

  // 🧠 command handler
  const handleCommand = (text) => {
    const hindi = isHindi(text);

    if (text.includes("youtube")) {
      const reply = hindi
        ? "यूट्यूब खोल रहा हूँ दोस्त"
        : "Opening YouTube buddy";

      setAssistantText(reply);
      speak(reply, hindi ? "hi-IN" : "en-IN");
      window.open("https://www.youtube.com", "_blank");
      return;
    }

    if (text.includes("play") || text.includes("song")) {
      const query = text
        .replace("play", "")
        .replace("song", "")
        .trim();

      const reply = hindi
        ? `${query} चला रहा हूँ`
        : `Playing ${query}`;

      setAssistantText(reply);
      speak(reply, hindi ? "hi-IN" : "en-IN");

      window.open(
        `https://www.youtube.com/results?search_query=${encodeURIComponent(
          query
        )}`,
        "_blank"
      );
      return;
    }

    sendToBackend(text, hindi);
  };

  // 🤖 backend AI (FIXED with try/catch)
  const sendToBackend = async (text, hindi) => {
  try {
    const res = await fetch("http://localhost:5000/api/ai/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        prompt: hindi
          ? `हिंदी में दोस्त की तरह जवाब दो: ${text}`
          : `Reply like a friendly assistant: ${text}`,
      }),
    });

    const data = await res.json();
    setAssistantText(data.reply);
    speak(data.reply, hindi ? "hi-IN" : "en-IN");

  } catch (error) {
    console.error("AI FETCH ERROR 👉", error);
    alert("AI server is not responding");
  }
};


  // ❌ delete account (FIXED)
  const deleteAccount = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      localStorage.clear();
      navigate("/");
    } catch {
      alert("Failed to delete account");
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-indigo-900 to-black flex flex-col items-center justify-center text-white px-4">

      <img
        src={localStorage.getItem("assistantImage")}
        className="w-52 rounded-xl mb-2"
        alt="assistant"
      />

      <p className="mb-6">
        I’m {localStorage.getItem("assistantName")}
      </p>

      {userText && (
        <div className="mb-2 bg-white/10 px-4 py-2 rounded-xl">
          <b>You:</b> {userText}
        </div>
      )}

      {assistantText && (
        <div className="mb-6 bg-blue-600/30 px-4 py-2 rounded-xl">
          <b>Assistant:</b> {assistantText}
        </div>
      )}

      {!started && (
        <button
          onClick={startAssistant}
          className="mb-6 px-6 py-3 bg-green-600 rounded-full"
        >
          Start Assistant
        </button>
      )}

      <button
        onClick={startListening}
        disabled={!started}
        className="w-20 h-20 rounded-full border-4 border-blue-500 flex items-center justify-center text-2xl animate-pulse disabled:opacity-50"
      >
        🎤
      </button>

      <button
        onClick={deleteAccount}
        className="absolute top-6 right-6 bg-red-600 px-4 py-2 rounded"
      >
        Delete Account
      </button>
    </div>
  );
}

export default Chat;
