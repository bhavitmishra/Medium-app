import { useNavigate } from "react-router-dom";

interface modal {
  setIsModalOpen: (value: boolean) => void;
}
export default function Header({ setIsModalOpen }: modal) {
  const navigate = useNavigate();
  return (
    <div className=" flex justify-between p-5">
      <div className="pl-30 font-disp text-3xl">
        <button
          className="cursor-pointer"
          onClick={() => {
            window.location.reload();
          }}
        >
          Medium
        </button>
      </div>
      <div className="flex items-center gap-2 pr-30">
        <div className="flex items-center gap-5">
          <button
            className="cursor-pointer"
            onClick={() => {
              window.open("https://github.com/bhavitmishra/Medium-app");
            }}
          >
            Our story{" "}
          </button>
          <button
            className="cursor-pointer"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Write{" "}
          </button>
          <button
            className="cursor-pointer"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Signin{" "}
          </button>
          <button
            className="cursor-pointer"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Signup{" "}
          </button>
          <button
            className="cursor-pointer bg-black text-white rounded-2xl w-25 h-9 text-[0.9rem] font-semibold"
            onClick={() => setIsModalOpen(true)}
          >
            Get Started{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
