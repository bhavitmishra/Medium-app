import { useNavigate } from "react-router-dom";

interface modal {
  setIsModalOpen: (value: boolean) => void;
}

export default function Header({ setIsModalOpen }: modal) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center px-4 py-4 gap-2 md:gap-0">
      <div className="font-disp text-3xl">
        <button
          className="cursor-pointer"
          onClick={() => {
            window.location.reload();
          }}
        >
          Medium
        </button>
      </div>

      <div className="flex flex-wrap md:flex-nowrap items-center gap-3 mt-2 md:mt-0">
        <button
          className="cursor-pointer"
          onClick={() => {
            window.open("https://github.com/bhavitmishra/Medium-app");
          }}
        >
          Our story
        </button>

        <button
          className="cursor-pointer"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Write
        </button>

        <button
          className="cursor-pointer"
          onClick={() => {
            navigate("/signin");
          }}
        >
          Signin
        </button>

        <button
          className="cursor-pointer"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Signup
        </button>

        <button
          className="cursor-pointer bg-black text-white rounded-2xl px-4 h-9 text-[0.9rem] font-semibold"
          onClick={() => setIsModalOpen(true)}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
