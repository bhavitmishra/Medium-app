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
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    const ublogs = async () => {
      try {
        const res = await axios.get(
          `https://backend.bhavitmishra.workers.dev/api/v1/blog/blog?id=${id}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        setBlogs(res.data.userblog); // ✅ correct field here
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    if (id) ublogs();
  }, [id]);

  if (blogs.length === 0) return <div>No blogs found</div>;

  return (
    <div className="p-4">
      <DashHeader />
      {blogs
        .slice()
        .reverse()
        .map((b) => (
          <div className="flex justify-between items-center flex-wrap ">
            <div className="w-50 md:w-screen">
              <Blog
                title={b.title}
                id={b.authorId}
                blogId={b.id}
                content={b.content}
                author={localStorage.getItem("name") || ""}
              />
            </div>
          </div>
        ))}
    </div>
  );
}
