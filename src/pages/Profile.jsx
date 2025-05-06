import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuthContext();
  const [uusername, setUsername] = useState("");
  const [uemail, setEmail] = useState("");

  useEffect(() => {
    const fetchUserDetails = async (email) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/user/getProfile/${email}`
        );

        if (response.ok) {
          const jsonData = await response.json();
          setUsername(jsonData.username);
          setEmail(jsonData.email);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchUserDetails(user.email);
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();

    const updatedUserDetails = {
      uusername,
      uemail,
    };

    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/user/UpdateUser/${user.email}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUserDetails),
      }
    );

    if (response.ok) {
      const json = await response.json();
      setUsername(json.uusername);
      setEmail(json.uemail);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Profile Info
        </h1>

        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Username <FaUser className="inline ml-1" />
            </label>
            <input
              type="text"
              value={uusername}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email <FaEnvelope className="inline ml-1" />
            </label>
            <input
              type="email"
              value={uemail}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-between mt-6">
            <Link to="/">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
              >
                Save
              </button>
            </Link>
            <Link to="/">
              <button
                type="button"
                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg transition"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
