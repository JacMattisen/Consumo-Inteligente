import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import LoginPage from "./views/LoginPage";
import { FormGasto } from "./components/FormGasto";
import { FormRendimentos } from "./components/FormRendimentos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/components/FormGasto" element={<FormGasto />} />
        <Route path="/components/FormRendimentos" element={<FormRendimentos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
