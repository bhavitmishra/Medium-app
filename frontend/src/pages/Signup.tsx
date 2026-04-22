import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://backend.bhavitmishra.workers.dev/api/v1/user/signup",
        { name, email, password }
      );

      const { token, id } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      localStorage.setItem("name", name);

      navigate("/dashboard");
    } catch (err) {
      setError("Something went wrong. Try a different email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f2ed] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border rounded-2xl shadow-sm p-8">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Create your account
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Start writing, reading, and thinking better.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div>
            <label className="text-sm font-medium mb-1 block">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black transition"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black transition"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">
              Password
            </label>
            <input
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black transition"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Use a strong password. Don’t reuse your Netflix one.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-black text-white py-3 rounded-full font-medium hover:scale-[1.02] transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* FOOT */}
        <div className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/signin")}
            className="underline hover:text-black"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}