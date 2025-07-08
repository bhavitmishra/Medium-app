import { useState } from "react";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { Link, useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="bg-[#f4f2ed]">
      <Header setIsModalOpen={setIsModalOpen} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {/* Your modal content */}
      </Modal>
      <hr />

      <div className="flex border">
        <div className="px-35 py-20">
          <div className="font-medium font-display text-[6.5rem] leading-30 ">
            Human <br />
            stories & ideas
          </div>
          <div className="text-2xl">
            <br />A place to read, write, and deepen your understanding
            <br />
            <br />
            <br />
            <button
              className="rounded-2xl bg-black w-50 h-10 text-white cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              Start reading
            </button>
          </div>
        </div>
        <div className="h-[570px] overflow-hidden ml-auto">
          <img
            className="h-[620px] w-110 object-cover object-top"
            src="https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png"
            alt="someimage"
          />
        </div>

        <br />
      </div>
      <hr />
      <footer className=" text-center py-4">
        © 2025 Medium_by_Mishra. All rights reserved.
      </footer>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4 pl-50">Join Medium</h2>
        <button
          className="w-full bg-black text-white py-2 rounded-lg cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </button>
        <p className="mb-4 pl-35">
          <br />
          Already have an account?{" "}
          <Link className="underline" to={"/signin"}>
            Sign in
          </Link>
          <br />
          <br />
        </p>
        <p className="w-full max-w-2xl mx-auto text-center">
          Click “Sign up” to agree to Medium’s Terms of Service and acknowledge
          that Medium’s Privacy Policy applies to you.
        </p>
      </Modal>
    </div>
  );
}
