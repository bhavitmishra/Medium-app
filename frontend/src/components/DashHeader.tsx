import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type BlogType = {
  id: string;
  title: string;
  content: string;
  author?: {
    name: string;
  };
};

export default function DashHeader() {
  const n = localStorage.getItem("name") || "B";
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!search.trim()) {
        setBlogs([]);
        return;
      }

      setLoading(true);

      try {
        const res = await axios.get(
          "https://backend.bhavitmishra.workers.dev/api/v1/blog/search",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            params: { q: search },
          }
        );

        setBlogs(res.data.blogs || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <div className="flex flex-col">

      {/* HEADER */}
      <div className="flex items-center px-6 py-4 bg-white border-b">

        {/* LEFT */}
        <button
          onClick={() => navigate("/dashboard")}
          className="text-2xl font-bold tracking-tight"
        >
          Medium
        </button>

        {/* SEARCH */}
        <div className="relative ml-8 w-full max-w-md">
          <input
            type="text"
            placeholder="Search stories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
          />

          {/* SEARCH DROPDOWN */}
          {search.trim() && (
            <div className="absolute top-12 left-0 w-full bg-white border rounded-xl shadow-lg max-h-80 overflow-y-auto z-50">
              
              {loading ? (
                <div className="p-4 text-sm text-gray-500">
                  Searching...
                </div>
              ) : blogs.length > 0 ? (
                blogs.map((b) => (
                  <div
                    key={b.id}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-none"
                    onClick={() => navigate(`/blog/${b.id}`)}
                  >
                    <div className="font-medium text-sm line-clamp-1">
                      {b.title}
                    </div>
                    <div className="text-xs text-gray-500 line-clamp-1">
                      {b.author?.name || "Unknown"}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-sm text-gray-500">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="ml-auto flex items-center gap-6">

          <button
            onClick={() => navigate("/blogpublish")}
            className="px-4 py-2 rounded-full border text-sm hover:bg-gray-100 transition"
          >
            Write
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="text-sm text-gray-600 hover:text-black transition"
          >
            Sign out
          </button>

          <button
            onClick={() => navigate("/userblog")}
            className="h-9 w-9 flex items-center justify-center rounded-full bg-black text-white text-sm font-semibold"
          >
            {n.slice(0, 1)}
          </button>
        </div>
      </div>
    </div>
  );
}