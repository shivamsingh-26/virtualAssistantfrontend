import { BrowserRouter, Routes, Route } from "react-router-dom";
import AssistantName from "./pages/AssistantName";
import AssistantSelect from "./pages/AssistantSelect";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/assistant" element={<AssistantSelect />} />
        <Route path="/assistant-name" element={<AssistantName />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
