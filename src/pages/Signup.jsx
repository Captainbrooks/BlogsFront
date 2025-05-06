import { useState } from "react";
import { useSignup } from "../hooks/useSignUp";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(username, email, password);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Sign up
        </h1>
        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Username <FaUser className="inline ml-1" />
            </label>
            <input
              type="text"
              value={username}
              required
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email <FaEnvelope className="inline ml-1" />
            </label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Password <FaLock className="inline ml-1" />
            </label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
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
            {isLoading ? "Signing..." : "Sign up"}
          </button>
          {error && (
            <div className="text-red-600 text-sm mt-2 text-center">{error}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
