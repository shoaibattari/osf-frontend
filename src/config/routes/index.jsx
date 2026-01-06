import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import UserLayout from "../../layout/User";
import AuthLayout from "../../layout/Auth";
import AdminLayout from "../../layout/Admin";
import logo from "/logo.png";

const Root = () => {
  const { isAuthenticated, role, splashLoading } = useAuthContext();

  return (
    <div className="relative pb-40 laptop-sm:pb-24 min-h-screen">
      {splashLoading ? (
        <div className="h-screen flex flex-col items-center justify-center text-white bg-black w-full">
          <img src={logo} className="animate-pulse " alt="" />
          <span className="text-secondary text-lg">
            Social Welfare Committee Loading....
          </span>
        </div>
      ) : (
        <Routes>
          <Route
            exact
            path="/*"
            element={
              isAuthenticated && role === "user" ? (
                <Navigate to="/user/participants" replace />
              ) : isAuthenticated && role === "admin" ? (
                <Navigate to="/admin/" replace />
              ) : (
                <AuthLayout />
              )
            }
          />
          <Route
            exact
            path="/auth/*"
            element={
              isAuthenticated ? <Navigate to="/user" replace /> : <AuthLayout />
            }
          />
          <Route
            exact
            path="/user/*"
            element={
              isAuthenticated && role === "user" ? (
                <UserLayout />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            exact
            path="/admin/*"
            element={
              isAuthenticated && role === "admin" ? (
                <AdminLayout />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      )}

      <footer className="absolute bottom-0 border-t py-6 text-center text-sm bg-black text-gray-50 w-full">
        <p>
          App Created:{" "}
          <a
            className="font-semibold underline"
            href="https://wa.me/+923313416850"
            target="_blank"
          >
            Shoaib Abdul Sattar Khosa{" "}
          </a>
        </p>
        <p>Vice Chairman (OMJ IT Committee)</p>
        <p>Okhai Memon Jamat Social Welfare Committee</p>
        <p className="text-mediumGray">
          Serving the community with dedication since establishment
        </p>
        <p>© {new Date().getFullYear()} All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Root;
