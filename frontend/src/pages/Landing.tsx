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

      {/* HERO */}
      <section className="flex flex-col-reverse md:flex-row items-center px-6 md:px-24 py-16 md:py-24 gap-12 border-b">
        
        {/* LEFT */}
        <div className="w-full md:w-1/2">
          <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">
            Stay curious
          </p>

          <h1 className="font-display text-5xl md:text-[6.5rem] leading-tight md:leading-[6rem] tracking-tight">
            Human <br />
            <span className="italic text-gray-600">stories</span> & ideas
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mt-6 max-w-lg">
            A place where sharp minds write, curious people read, and ideas
            actually go somewhere.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <button
              className="bg-black text-white px-8 py-3 rounded-full text-sm md:text-base hover:scale-105 transition"
              onClick={() => setIsModalOpen(true)}
            >
              Start Reading
            </button>

            <button className="text-sm md:text-base underline text-gray-600 hover:text-black transition">
              Explore topics →
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#f4f2ed] via-transparent to-transparent z-10" />

          <img
            className="h-[380px] md:h-[620px] w-full object-cover object-top rounded-xl shadow-md"
            src="https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png"
            alt="hero"
          />

          {/* Floating stat */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow text-sm">
            <span className="font-semibold text-lg">750K+</span> stories
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-sm text-gray-500">
        © 2026 Medium_by_Mishra · Built with questionable life choices
      </footer>

      {/* MODAL */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Join Medium
        </h2>

        <button
          className="w-full bg-black text-white py-3 rounded-full hover:scale-[1.02] transition"
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

        <p className="text-xs text-center text-gray-500">
          By continuing, you agree to terms you definitely won’t read.
        </p>
      </Modal>
    </div>
  );
}