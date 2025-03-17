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
import MyReservations from "./pages/MyReservations/MyReservations";
import { Reservations } from "./pages/Reservations/Reservations";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CheckIn from "./pages/CheckIn/CheckIn";

function App() {
  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
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
            <Route path="/my-reservations" element={<MyReservations />} />
            <Route path="/check-in" element={<CheckIn />} />
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
