import { useNavigate } from "react-router-dom";

interface HeaderProps {
  setIsModalOpen: (value: boolean) => void;
}

export default function Header({ setIsModalOpen }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap items-center justify-between px-4 py-4 bg-white shadow-md">
      {/* Left: Logo */}
      <div className="text-2xl font-bold">
        <button
          onClick={() => window.location.reload()}
          className="cursor-pointer"
        >
          Medium
        </button>
      </div>

      {/* Center: Navigation (stack on mobile) */}
      <div className="flex flex-wrap items-center gap-4 mt-2 sm:mt-0">
        <button
          onClick={() =>
            window.open("https://github.com/bhavitmishra/Medium-app")
          }
        >
          Our story
        </button>
        <button onClick={() => setIsModalOpen(true)}>Write</button>
        <button onClick={() => navigate("/signin")}>Signin</button>
        <button onClick={() => navigate("/signup")}>Signup</button>
      </div>

      {/* Right: CTA */}
      <div className="mt-2 sm:mt-0">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white rounded-2xl px-4 py-2 text-sm font-semibold"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
