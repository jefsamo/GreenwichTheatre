import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import AppLayout from "./ui/AppLayout";
import Play from "./pages/Play/Play";
import Reservation from "./pages/Reservation/Reservation";
import { Toaster } from "react-hot-toast";
import { NotFound } from "./pages/NotFound/NotFound";
import ProtectedRoute from "./ui/ProtectedRoute";
import Cart from "./pages/Cart/Cart";
import MyTicket from "./pages/MyTicket/MyTicket";
import { Reservations } from "./pages/Reservations/Reservations";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/play/:playId" element={<Play />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/tickets" element={<MyTicket />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
        }}
      />
    </>
  );
}

export default App;
