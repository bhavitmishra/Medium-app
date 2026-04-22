import axios from "axios";
import { useEffect, useState } from "react";
import DashHeader from "../components/DashHeader";
import Blog from "../components/Blog";

type BlogType = {
  id: string;
  title: string;
  content: string;
  authorId: string;
};

export default function UserBlogs() {
  const id = localStorage.getItem("id");
  const name = localStorage.getItem("name") || "";

  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `https://backend.bhavitmishra.workers.dev/api/v1/blog/blog?id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setBlogs(res.data.userblog || []);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [id]);

  return (
    <div className="bg-gray-50 min-h-screen">

      <DashHeader />

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* PAGE TITLE */}
        <h1 className="text-3xl font-bold mb-8">
          Your Stories
        </h1>

        {/* LOADING */}
        {loading && (
          <div className="space-y-6 animate-pulse">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl" />
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && blogs.length === 0 && (
          <div className="text-gray-500 text-center mt-20">
            No blogs yet. Go write something instead of refreshing this page.
          </div>
        )}

        {/* BLOG LIST */}
        {!loading && blogs.length > 0 && (
          <div className="space-y-6">
            {blogs
              .slice()
              .reverse()
              .map((b) => (
                <Blog
                  key={b.id}
                  id={b.id} 
                  blogId={b.id}
                  title={b.title}
                  content={b.content}
                  author={name}
                />
              ))}
          </div>
        )}

      </div>
    </div>
  );
}