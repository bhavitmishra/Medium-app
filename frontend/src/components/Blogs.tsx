import axios from "axios";
import { useEffect, useState } from "react";
import Blog from "./Blog.tsx";
import { useNavigate } from "react-router-dom";

type BlogType = {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
  // add other fields if needed
};

export default function Blogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect to landing page
    }
    const fetchBlogs = async () => {
      try {
        const resp = await axios.get(
          "https://backend.bhavitmishra.workers.dev/api/v1/blog/bulk",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token") || "",
            },
          }
        );

        setBlogs(resp.data?.blogs || []);
      } catch (err) {
        setError("Failed to load blogs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading)
    return (
      <div className="text-3xl flex justify-center items-center font-display">
        Loading blogs...
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div>
      {blogs
        .slice()
        .reverse()
        .map((blog) => (
          <Blog
            id={blog.id}
            title={blog.title}
            content={blog.content}
            author={blog.author.name}
          />
        ))}
    </div>
  );
}
