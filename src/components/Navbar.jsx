import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { useLogout } from "../hooks/useLogout";
import { BsHouseDoor } from "react-icons/bs";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

function Navbar() {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [authUsername, setAuthUsername] = useState("");

  const handleLogout = () => {
    logout();
  };

  const isAuth = user ? `${user.username}` : "";

  useEffect(() => {
    const fetchUserDetails = async (email) => {
      const response = await fetch(`http://localhost:7000/api/user/getProfile/` + email, {
        method: "GET",
      });

      if (response.ok) {
        const json = await response.json();
        setAuthUsername(json.username);
      }
    };

    if (user) {
      fetchUserDetails(user.email);
    }
  }, [user]);

  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-red-600">
          M<span className="text-gray-600 text-sm">Blogs</span>
        </Link>

        {isAuth ? (
          <ul className="flex items-center space-x-6">
            <li className="text-gray-700 text-sm">
              Hi, <span className="font-semibold">{authUsername}</span>
            </li>

            <li>
              <Link to="/" className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition">
                <BsHouseDoor />
                <span>Home</span>
              </Link>
            </li>

            <li>
              <Link to="/getProfile" className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition">
                <FaUser />
                <span>Profile</span>
              </Link>
            </li>

            <li>
              <button onClick={handleLogout} className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition">
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        ) : (
          <ul className="flex items-center space-x-6">
            <li>
              <Link to="/login" className="text-gray-700 hover:text-red-600 transition">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="text-gray-700 hover:text-red-600 transition">
                Signup
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
