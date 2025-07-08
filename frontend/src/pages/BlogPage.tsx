import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DOMPurify from "dompurify";

type BlogType = {
  authorId: string;
  title: string;
  id: string;
  content: string;
};

export default function BlogPage() {
  const [data, setData] = useState<BlogType | null>(null);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect to landing page
    }
    const getBlog = async () => {
      try {
        const res = await axios.get(
          `https://backend.bhavitmishra.workers.dev/api/v1/blog/blog`,
          {
            params: { id },
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        setData(res.data.userblog[0]);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };

    if (id) getBlog();
  }, [id]);

  if (!data) return <div className="text-center text-xl mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
      <div className="mb-4 text-gray-500 text-sm">
        <span className="font-semibold">Author:</span> {name}
      </div>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
        {data.title}
      </h1>
      <div
        className="text-gray-800 leading-relaxed text-lg whitespace-pre-line break-words prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(data.content),
        }}
      />
    </div>
  );
}
