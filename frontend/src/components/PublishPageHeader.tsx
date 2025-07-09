import { useNavigate } from "react-router-dom";

export default function PublishPageHeader() {
  const n = localStorage.getItem("name") || "B";
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 px-4 py-3 sm:px-6 sm:py-4 bg-white shadow-md">
        <div className="font-disp text-2xl sm:text-3xl font-bold text-gray-900">
          <button
            className="cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            Medium
          </button>
        </div>

        <div className="flex justify-between sm:ml-auto sm:justify-end items-center gap-4 sm:gap-8 w-full sm:w-auto">
          <div className="h-9 w-9 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold text-sm">
            <button
              className="cursor-pointer"
              onClick={() => navigate("/userblog")}
            >
              {n.slice(0, 1)}
            </button>
          </div>
        </div>
      </div>

      {/* Search Results */}
    </div>
  );
}
