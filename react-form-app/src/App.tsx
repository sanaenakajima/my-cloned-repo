// App.tsx
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationFormContainer from "./components/RegistrationFormContainer";
import RegistrationSuccessPage from "./pages/RegistrationComplete";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationFormContainer />} />
        <Route path="/registration-complete" element={<RegistrationSuccessPage />} />
      </Routes>
    </Router>
  );
};

export default App;

