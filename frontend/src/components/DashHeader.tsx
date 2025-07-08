import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Blog from "./Blog";

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

  useEffect(() => {
    const fetchBlogs = async () => {
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
        // Assuming API returns { blogs: [...] }
        setBlogs(res.data.blogs || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    if (search.trim().length > 0) fetchBlogs();
  }, [search]);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center px-6 py-4 bg-white shadow-md">
        <div className="font-disp text-3xl font-bold text-gray-900">
          <button
            className="cursor-pointer"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Medium
          </button>
        </div>

        <input
          className="ml-10 px-4 py-2 bg-gray-200 rounded-full text-sm w-64 outline-none focus:ring-2 focus:ring-gray-400"
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search"
        />

        <div className="ml-auto flex items-center gap-8">
          <button
            onClick={() => navigate("/blogpublish")}
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-black transition cursor-pointer"
          >
            <img className="h-5 w-5" src="/Writing.png" alt="write icon" />
            <span>Write</span>
          </button>

          <div className="h-9 w-9 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold text-sm">
            <button
              className="cursor-pointer"
              onClick={() => {
                navigate("/userblog");
              }}
            >
              {n.slice(0, 1)}
            </button>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {search.trim() && (
        <div className="px-6 py-4">
          {blogs.length > 0 ? (
            blogs.map((b) => (
              <Blog
                key={b.id}
                id={b.id}
                title={b.title}
                content={b.content}
                author={b.author?.name || "Unknown"}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-6">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
}
