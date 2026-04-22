import axios from "axios";
import { useEffect, useState } from "react";
import Blog from "./Blog";
import { useNavigate } from "react-router-dom";

type BlogType = {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
};

export default function Blogs() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    const fetchBlogs = async () => {
      try {
        const resp = await axios.get(
          "https://backend.bhavitmishra.workers.dev/api/v1/blog/bulk",
          {
            headers: {
              Authorization: `Bearer ${token}`, // not that ugly OR chain anymore
            },
          }
        );

        // sort once, not inside render like a barbarian
        const sorted = (resp.data?.blogs || []).reverse();
        setBlogs(sorted);
      } catch (err) {
        console.error(err);
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // 🔄 LOADING
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading blogs...
      </div>
    );
  }

  // ❌ ERROR
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  // 📭 EMPTY
  if (blogs.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        No blogs yet. Go write something instead of staring at this.
      </div>
    );
  }
return (
  <div className="bg-gray-50 min-h-screen">
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blogId={blog.id}
          id={blog.id}
          title={blog.title}
          content={blog.content}
          author={blog.author.name}
        />
      ))}
    </div>
  </div>
);
}