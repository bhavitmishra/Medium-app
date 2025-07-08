import { useState } from "react";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inc, setInc] = useState(false);
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
      {/* Background Image */}

      {/* Overlay Card */}
      <div className="flex items-center justify-center w-full h-full">
        <div className="bg-white p-10 rounded-lg shadow-lg w-[30rem] space-y-6">
          <Heading title="Signin" />
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
              }
            }}
          >
            SignIn
          </button>
        </div>
      </div>
    </div>
  );
}
