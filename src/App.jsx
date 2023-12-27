import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import UserPage from "./pages/Users/UsersPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/users" exact element={<UserPage />} />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
