import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import Login from "./components/ui/User/Login";
import { Register } from "./components/ui/User/Register";
import AppBar from "./components/Common/AppBar";

function App() {
  return (
    <section className="w-screen h-screen flex flex-col items-center">
      <div className="w-full">
        <BrowserRouter>
          {/* must specify appbar compo. inside browserRouter if you want to use NavLink */}
          <AppBar />
          <Routes>
            <Route index path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>
    </section>
  );
}

export default App;
