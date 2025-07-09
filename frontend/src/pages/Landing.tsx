import { useState } from "react";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { Link, useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-[#f4f2ed] min-h-screen flex flex-col">
      <Header setIsModalOpen={setIsModalOpen} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4 text-center">Join Medium</h2>
        <button
          className="w-full bg-black text-white py-2 rounded-lg"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </button>
        <p className="my-4 text-center">
          Already have an account?{" "}
          <Link className="underline" to={"/signin"}>
            Sign in
          </Link>
        </p>
        <p className="text-center text-sm text-gray-600 px-2">
          Click “Sign up” to agree to Medium’s Terms of Service and acknowledge
          that Medium’s Privacy Policy applies to you.
        </p>
      </Modal>

      <hr />

      <div className="flex flex-col-reverse md:flex-row items-center md:justify-between px-6 md:px-20 py-10 gap-8 border">
        <div className="text-center md:text-left max-w-xl">
          <h1 className="font-semibold font-display text-4xl sm:text-5xl md:text-6xl leading-tight">
            Human <br />
            stories & ideas
          </h1>
          <p className="text-lg sm:text-xl mt-6">
            A place to read, write, and deepen your understanding.
          </p>
          <button
            className="mt-6 px-6 py-2 bg-black text-white rounded-xl"
            onClick={() => setIsModalOpen(true)}
          >
            Start reading
          </button>
        </div>

        <div className="w-full md:w-1/2 max-h-[400px] overflow-hidden">
          <img
            className="w-full h-full object-cover object-top rounded-lg"
            src="https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png"
            alt="someimage"
          />
        </div>
      </div>

      <hr />

      <footer className="text-center py-6 text-sm text-gray-500">
        © 2025 Medium_by_Mishra. All rights reserved.
      </footer>
    </div>
  );
}
