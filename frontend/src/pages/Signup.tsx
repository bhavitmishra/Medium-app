import { useState } from "react";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-[#f4f2ed] relative w-screen h-screen">
      {/* Overlay Card */}
      <div className="flex items-center justify-center w-full h-full">
        <div className="bg-white p-10 rounded-lg shadow-lg w-[30rem] space-y-6">
          <Heading title="Signup" />
          <InputBox title="Name" placeholder="John Doe" setVal={setName} />
          <InputBox
            title="Email"
            placeholder="you@example.com"
            setVal={setEmail}
          />
          <InputBox
            title="Password"
            placeholder="••••••••"
            setVal={setPassword}
          />

          <button
            className="w-full bg-black text-white py-2 rounded-lg font-semibold"
            onClick={async (e) => {
              e.preventDefault();
              try {
                const resp = await axios.post(
                  "https://backend.bhavitmishra.workers.dev/api/v1/user/signup",
                  { email, name, password }
                );
                const token = resp.data.token;
                const id = resp.data.id;
                localStorage.setItem("name", name);
                if (token && id) {
                  localStorage.setItem("id", id);
                  localStorage.setItem("token", token);
                  navigate("/dashboard");
                }
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
