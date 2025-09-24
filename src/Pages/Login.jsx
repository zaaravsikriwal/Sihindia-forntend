import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Mock role detection logic
    let role = null;
    if (username.toLowerCase().startsWith("asha")) role = "asha";
    else if (username.toLowerCase().startsWith("gov")) role = "gov";

    if (role) navigate(`/dashboard/${role}`);
    else setError("Invalid ID. Please use your assigned unique ID.");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side */}
      <div className="hidden md:flex w-1/2 bg-teal-600 text-white flex-col justify-center p-12">
        <h1 className="text-4xl font-bold mb-6">Welcome to SHSEWS</h1>
        <p className="mb-6 text-lg">
          Smart Health Surveillance & Early Warning System for water-borne
          disease prevention.
        </p>
        <ul className="space-y-4">
          <li>💧 Monitor water quality</li>
          <li>📊 Track community health reports</li>
          <li>⚠️ Get real-time outbreak alerts</li>
          <li>🎯 Plan interventions efficiently</li>
        </ul>
      </div>

      {/* Right side */}
      <div className="flex w-full md:w-1/2 bg-gray-100 items-center justify-center p-8">
        <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-teal-600">
            Login
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Enter your unique ID"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-bold bg-teal-600 hover:bg-teal-500 text-white transition"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-6 text-gray-500 text-sm">
            © 2025 SHSEWS
          </p>
        </div>
      </div>
    </div>
  );
}
