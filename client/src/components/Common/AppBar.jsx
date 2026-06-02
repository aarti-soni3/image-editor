import { useNavigate } from "react-router";
import { Blend } from "lucide-react";
import { Button } from "../ui/shadcn templates/button";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slice/authSlice";

export default function AppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <header className="fixed t-0 z-50 w-full m-auto p-4 flex flex-row justify-between bg-muted shadow-sm">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center gap-2 font-bold ${isActive ? "active" : ""}`
        }
      >
        <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Blend className="size-4" />
        </div>
        PicBlend
      </NavLink>
      {/* <div>
        <nav>
          <Button variant="link" aschild className="font-bold text-lg">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </Button>
        </nav>
      </div> */}
      <div className="flex flex-row">
        {!user ? (
          <>
            <Button variant="link" className="font-semibold text-md" aschild>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Login
              </NavLink>
            </Button>
            <Button variant="link" className="font-semibold text-md" aschild>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Register
              </NavLink>
            </Button>
          </>
        ) : (
          <Button
            variant="link"
            className="font-semibold text-md"
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </div>
    </header>
  );
}
