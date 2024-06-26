import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateUser from "./Components/CreateUser.jsx";
import Users from "./Components/Users.jsx";

axios.defaults.baseURL = "http://localhost:3000/api/";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateUser />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}
