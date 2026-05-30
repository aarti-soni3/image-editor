import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to={"/login"} replace />;

  return <Outlet />;
}
