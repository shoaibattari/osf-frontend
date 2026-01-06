import { CommonButton } from "../../components";
import { useAuthContext } from "../../context/AuthContext";

import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { SignupScreen } from "../../views/auth";

const AdminLayout = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 hidden laptop-sm:block bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold mb-4">Dashbaord</h2>

        <nav className="space-y-2">
          <Link to="/admin" className="block hover:underline">
            Dashboard
          </Link>
        </nav>
        <div className="mt-6 flex flex-col space-y-2">
          <CommonButton variant="danger" onClick={logout}>
            Logout
          </CommonButton>
          <CommonButton onClick={() => navigate("/admin/signup")}>
            Sign up
          </CommonButton>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <div className="flex justify-end gap-2 laptop-sm:hidden">
          <CommonButton variant="danger" onClick={logout}>
            Logout
          </CommonButton>
          <CommonButton onClick={() => navigate("/admin/signup")}>
            Sign up
          </CommonButton>
        </div>
        <Routes>
          {/* <Route path="/*" element={<AdminDashboardScreen />} /> */}
          <Route path="/Signup" element={<SignupScreen />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminLayout;
