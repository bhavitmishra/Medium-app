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
  const [isDeleting, setIsDeleting] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [posting, setPosting] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const blogId = searchParams.get("blogid");
  const authorid = searchParams.get("authorid");
  const name = searchParams.get("name");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }

    const getBlog = async () => {
      try {
        const res = await axios.get(
          `https://backend.bhavitmishra.workers.dev/api/v1/blog/blog`,
          {
            params: { id: blogId },
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setData(res.data.userblog[0]);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };

    if (blogId) getBlog();
  }, [blogId, navigate]);

  useEffect(() => {
    const fetchComments = async () => {
      setLoadingComments(true);
      try {
        const res = await axios.get(
          `https://backend.bhavitmishra.workers.dev/api/v1/blog/comment`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            params: { blogId }, // ✅ Correct param name
          }
        );
        setComments(res.data.comments || []);
      } catch (err) {
        console.error("Failed to fetch comments", err);
      } finally {
        setLoadingComments(false);
      }
    };

    if (blogId) fetchComments();
  }, [blogId, setNewComment]);

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    setPosting(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `https://backend.bhavitmishra.workers.dev/api/v1/blog/comment`,
        {
          id: blogId,
          content: newComment,
          name: localStorage.getItem("name"),
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setNewComment("");

      // ✅ Re-fetch comments correctly
      const refreshed = await axios.get(
        `https://backend.bhavitmishra.workers.dev/api/v1/blog/comment`,
        {
          params: { blogId },
        }
      );
      setComments(refreshed.data.comments || []);
    } catch (err) {
      console.error("Comment post failed:", err);
    } finally {
      setPosting(false);
    }
  };

  if (!data) return <div className="text-center text-xl mt-10">Loading...</div>;

return (
  <div className="bg-white min-h-screen">

    <div className="max-w-3xl mx-auto px-6 py-12">

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-4xl font-bold leading-tight tracking-tight mb-4">
          {data.title}
        </h1>

        <div className="flex items-center justify-between text-sm text-gray-500">
          {/* AUTHOR */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
              {name?.[0]}
            </div>
            <span>{name}</span>
          </div>

          {/* ACTIONS */}
          {localStorage.getItem("id") === authorid && (
            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/updateblog?id=${blogId}`)}
                className="px-3 py-1 text-sm border rounded-full hover:bg-gray-100 transition"
              >
                Edit
              </button>

              <button
                onClick={async () => {
                  setIsDeleting(true);
                  try {
                    await axios.delete(
                      `https://backend.bhavitmishra.workers.dev/api/v1/blog/`,
                      {
                        params: { id: blogId },
                        headers: {
                          Authorization:
                            "Bearer " + localStorage.getItem("token"),
                        },
                      }
                    );
                    navigate("/userblog");
                  } finally {
                    setIsDeleting(false);
                  }
                }}
                className="px-3 py-1 text-sm border border-red-500 text-red-500 rounded-full hover:bg-red-50 transition"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CONTENT (NO PROSE → no weird dot) */}
      <div
        className="text-gray-800 text-lg leading-relaxed whitespace-pre-line break-words"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(data.content),
        }}
      />

      {/* DIVIDER */}
      <div className="my-12 h-[1px] bg-gray-200" />

      {/* COMMENTS */}
      <div>

        <h2 className="text-2xl font-semibold mb-6">
          Responses
        </h2>

        {loadingComments ? (
          <p className="text-gray-500">Loading...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-500">No responses yet.</p>
        ) : (
          <div className="space-y-6">
            {comments.map((c) => (
              <div key={c.id} className="flex gap-3">

                {/* AVATAR */}
                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold">
                  {c.authorName?.[0] || "A"}
                </div>

                {/* COMMENT */}
                <div className="flex-1">
                  <div className="text-sm text-gray-600 mb-1">
                    {c.authorName || "Anonymous"}
                  </div>

                  <p className="text-gray-800 whitespace-pre-wrap">
                    {c.content}
                  </p>

                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(c.createdAt).toLocaleString()}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* COMMENT BOX */}
        <div className="mt-10">

          <textarea
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a response..."
            className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-black resize-none"
          />

          <div className="flex justify-end mt-3">
            <button
              onClick={handlePostComment}
              disabled={posting}
              className="bg-black text-white px-5 py-2 rounded-full text-sm hover:opacity-90 transition"
            >
              {posting ? "Posting..." : "Respond"}
            </button>
          </div>

        </div>

      </div>
    </div>
  </div>
);
}
