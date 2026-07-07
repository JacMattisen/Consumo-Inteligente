import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Toaster } from "sonner";

import Dashboard from "./views/Dashboard";
import Login from "./components/Login";
import Register from "./components/ui/Register";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" richColors theme="dark" />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
