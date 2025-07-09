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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <hr />

      <div className="flex flex-col-reverse md:flex-row border px-6 py-10 md:px-24 md:py-20 items-center gap-8">
        <div className="w-full md:w-1/2">
          <div className="font-medium font-display text-4xl md:text-[6.5rem] leading-tight md:leading-[6rem]">
            Human <br />
            stories & ideas
          </div>
          <div className="text-lg md:text-2xl mt-6">
            A place to read, write, and deepen your understanding
          </div>
          <button
            className="mt-8 rounded-2xl bg-black px-6 py-2 text-white cursor-pointer text-sm md:text-base"
            onClick={() => setIsModalOpen(true)}
          >
            Start reading
          </button>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <img
            className="max-h-[400px] md:h-[620px] w-full object-cover object-top rounded-lg"
            src="https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png"
            alt="someimage"
          />
        </div>
      </div>

      <hr />
      <footer className="text-center py-4 text-sm md:text-base">
        © 2025 Medium_by_Mishra. All rights reserved.
      </footer>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4 text-center">Join Medium</h2>
        <button
          className="w-full bg-black text-white py-2 rounded-lg cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </button>
        <p className="my-4 text-center text-sm">
          Already have an account?{" "}
          <Link className="underline" to={"/signin"}>
            Sign in
          </Link>
        </p>
        <p className="w-full max-w-2xl mx-auto text-center text-xs">
          Click “Sign up” to agree to Medium’s Terms of Service and acknowledge
          that Medium’s Privacy Policy applies to you.
        </p>
      </Modal>
    </div>
  );
}
