import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import AppLayout from "./ui/AppLayout";
import Play from "./pages/Play/Play";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/play/:playId" element={<Play />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
