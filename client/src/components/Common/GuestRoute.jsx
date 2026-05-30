import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export default function GuestRoute() {
  const { user } = useSelector((state) => state.auth);

  if (user) return <Navigate to={"/"} replace />;

  return <Outlet />;
}
