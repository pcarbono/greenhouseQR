import React from "react";
import { Routes, Route } from "react-router-dom";
import UserManagement from "./pages/UserManagement";
import UserDetail from "./pages/UserDetail"; // Importa la nueva página del usuario

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UserManagement />} />
        <Route path="/user/:userId" element={<UserDetail />} />
      </Routes>
    </div>
  );
}
export default App;

