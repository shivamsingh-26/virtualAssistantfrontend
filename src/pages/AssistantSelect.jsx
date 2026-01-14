import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import your images from assets
import img3 from "../assets/3.jpeg";
import img4 from "../assets/4.jpeg";
import img5 from "../assets/5.jpeg";
import img6 from "../assets/6.jpeg";
import img7 from "../assets/7.jpeg";

const assistants = [img3, img4, img5, img6, img7];

function AssistantSelect() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  // ✅ PROTECT ROUTE (must be logged in)
  if (!localStorage.getItem("token")) {
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-black text-white flex flex-col items-center">
      <h1 className="text-2xl mt-8 mb-6">Select your Assistant Image</h1>

      <div className="grid grid-cols-3 gap-6">
        {assistants.map((img, index) => (
          <div
            key={index}
            onClick={() => setSelected(index)}
            className={`w-28 h-40 rounded-xl overflow-hidden cursor-pointer border-2 ${
              selected === index ? "border-white" : "border-transparent"
            }`}
          >
            <img
              src={img}
              alt="assistant"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <button
        disabled={selected === null}
        onClick={() => {
          localStorage.setItem("assistantImage", assistants[selected]);
          navigate("/assistant-name");
        }}
        className="mt-8 px-10 py-2 rounded-full bg-white text-black disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export default AssistantSelect;
