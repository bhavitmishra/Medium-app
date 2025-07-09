import { useState } from "react";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inc, setInc] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (inc) {
    setTimeout(() => {
      setInc(false);
      navigate("/signin");
    }, 2000);
    return (
      <div className="text-red-600 text-9xl underline">
        "enter correct credentials"
      </div>
    );
  }

  return (
    <div className="bg-[#f4f2ed] relative w-screen h-screen">
      {/* Overlay Card */}
      <div className="flex items-center justify-center w-full h-full">
        <div className="bg-white p-10 rounded-lg shadow-lg w-[30rem] space-y-6">
          <Heading title="Signin" />
          <InputBox
            title="Email"
            placeholder="you@example.com"
            setVal={setEmail}
            type="text"
          />
          <InputBox
            title="Password"
            placeholder="••••••••"
            setVal={setPassword}
            type="password"
          />

          <button
            className="w-full bg-black text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
            onClick={async (e) => {
              e.preventDefault();
              setLoading(true);
              try {
                const resp = await axios.post(
                  "https://backend.bhavitmishra.workers.dev/api/v1/user/signin",
                  { email, password }
                );
                const token = resp.data.token;
                const name = resp.data.name;
                const id = resp.data.id;

                localStorage.setItem("name", name);
                if (token && id) {
                  localStorage.setItem("id", id);
                  localStorage.setItem("token", token);
                  navigate("/dashboard");
                } else {
                  setInc(true);
                }
              } catch (error) {
                setInc(true);
                console.log(error);
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Signing in...
              </div>
            ) : (
              "SignIn"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
