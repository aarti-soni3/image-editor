import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import Login from "./components/ui/User/Login";
import { Register } from "./components/ui/User/Register";
import AppBar from "./components/Common/AppBar";
import { ToastProvider } from "./context/ToastProvider";
import Home from "./components/Common/Home";
import { useAccessQuery } from "./store/services/authApiSlice";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import GuestRoute from "./components/Common/GuestRoute";

function App() {
  useAccessQuery();

  return (
    <section className="w-screen h-screen flex flex-col items-center">
      <div className="w-full">
        <ToastProvider>
          <BrowserRouter>
            {/* must specify appbar compo. inside browserRouter if you want to use NavLink */}
            <AppBar />
            {/* <div className="w-full m-25" /> */}
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route index path="/" element={<Home />} />
              </Route>
              <Route element={<GuestRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </div>
    </section>
  );
}

export default App;
