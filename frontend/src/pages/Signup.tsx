import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// A simple spinner component for the loading state
function LoadingSpinner() {
  return <div className="text-xl font-semibold">Loading...</div>;
}

export default function Signin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Use a descriptive name for error state
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 1. The handleSubmit function is now an async event handler.
  // It manages logic only, not JSX.
  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevents the default form submission (page reload)
    setLoading(true);
    setError(""); // Clear previous errors on a new submission

    try {
      const response = await axios.post(
        "https://backend.bhavitmishra.workers.dev/api/v1/user/signup",
        { name, email, password }
      );
      localStorage.setItem("name", name);

      const { token, id } = response.data;
      if (token && id) {
        localStorage.setItem("id", id);
        localStorage.setItem("token", token);
        navigate("/dashboard");
      }
    } catch (err) {
      // 2. Set an error message if the API call fails
      setError("Incorrect email or password. Please try again.");
    } finally {
      // 3. Always stop loading, whether it succeeds or fails
      setLoading(false);
    }
  };

  // 4. The component's return statement handles all rendering logic.
  // It checks the `loading` state first.
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // This is the main JSX for the component.
  return (
    <div className="flex">
      <div className="w-full lg:w-1/2 flex justify-center items-center h-screen p-4">
        {/* 5. The form uses `onSubmit` now, which is the standard practice. */}
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-center">
              Sign into your account
            </h1>
            <p className="text-center text-gray-500 mt-2">
              Welcome back! Please enter your details.
            </p>
          </div>

          {/* 6. Display the error message here if it exists */}
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4"
              role="alert"
            >
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="font-semibold block mb-1">
                Name
              </label>
              <input
                id="name"
                type="text" // Use type="email" for better validation
                placeholder="Julie Winfield"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-lg bg-gray-100 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="font-semibold block mb-1">
                Email
              </label>
              <input
                id="email"
                type="email" // Use type="email" for better validation
                placeholder="julie.winfield@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-lg bg-gray-100 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="font-semibold block mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded-lg bg-gray-100 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-black text-white font-bold p-3 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
              disabled={loading} // Disable button while loading
            >
              Sign In
            </button>
          </div>

          <div className="text-center mt-4 text-sm">
            <p>
              Don't have an account?{" "}
              <a
                href="#"
                className="font-semibold text-blue-600 hover:underline"
              >
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>

      {/* --- RIGHT SIDE: TESTIMONIAL --- */}
      <div className="hidden lg:flex bg-gray-800 text-white h-screen w-1/2 justify-center items-center">
        <div>
          <div className="font-bold text-2xl text-center">
            "The customer support I received <br /> was exceptional..."
          </div>
          <div className="mt-6 text-center">
            <div className="font-semibold">JULIE WINFIELD</div>
            <div className="text-sm font-light text-gray-400">
              CEO | Acme Corp
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
