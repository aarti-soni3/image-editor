import { Routes, Route, useLocation } from "react-router";
import "./App.css";
import Login from "./components/ui/User/Login";
import { Register } from "./components/ui/User/Register";
import AppBar from "./components/Common/AppBar";
import { ToastProvider } from "./context/ToastProvider";
import Home from "./components/Common/Home";
import { useAccessQuery } from "./store/services/authApiSlice";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import GuestRoute from "./components/Common/GuestRoute";
import { CropperProvider } from "./context/CropperProvider";

function App() {
  const location = useLocation();

  const shouldSkip =
    location.pathname === "/register" || location.pathname === "/login";

  useAccessQuery(undefined, { skip: shouldSkip });

  return (
    <section className="w-full h-full flex flex-col items-center bg-muted">
      <ToastProvider>
        <CropperProvider>
          {/* must specify appbar compo. inside browserRouter if you want to use NavLink */}
          <AppBar />
          <div className="w-full py-9" />
          <div className="w-full h-full flex flex-col justify-center px-10 md:px-25">
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route index path="/" element={<Home />} />
              </Route>
              <Route element={<GuestRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
            </Routes>
          </div>
        </CropperProvider>
      </ToastProvider>
    </section>
  );
}

export default App;
