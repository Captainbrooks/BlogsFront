import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email <FaEnvelope className="inline ml-1" />
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Password <FaLock className="inline ml-1" />
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 text-white font-semibold rounded-lg transition duration-200 ${
              isLoading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          {error && (
            <div className="mt-4 text-sm text-red-600 text-center">{error}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
