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
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
      <div className="mb-4 text-gray-500 text-sm">
        <span className="font-semibold">Author:</span> {name}
      </div>

      {localStorage.getItem("id") === authorid && (
        <div className="flex justify-end gap-4 mb-6">
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-xl transition duration-300 ease-in-out"
            onClick={() =>
              navigate(
                `/updateblog?id=${blogId}&title=${data.title}&content=${data.content}`
              )
            }
          >
            Edit Blog
          </button>
          <button
            className={`${
              isDeleting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            } text-white font-semibold py-2 px-6 rounded-xl transition duration-300 ease-in-out`}
            onClick={async () => {
              setIsDeleting(true);
              try {
                await axios.delete(
                  `https://backend.bhavitmishra.workers.dev/api/v1/blog/`,
                  {
                    params: { id: blogId },
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                );
                navigate("/userblog");
              } catch (err) {
                console.error("Delete failed:", err);
              } finally {
                setIsDeleting(false);
              }
            }}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Blog"}
          </button>
        </div>
      )}

      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
        {data.title}
      </h1>

      <div
        className="text-gray-800 leading-relaxed text-lg whitespace-pre-line break-words prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(data.content),
        }}
      />

      <hr className="my-8 border-t" />

      {/* Comments Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>

        {loadingComments ? (
          <p>Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first!</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((c) => (
              <li key={c.id} className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-800 whitespace-pre-wrap">{c.content}</p>
                <p className="text-sm text-gray-500 mt-2">
                  By {c.authorName || "Anonymous"} on{" "}
                  {new Date(c.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6">
          <textarea
            rows={3}
            className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={handlePostComment}
            disabled={posting}
            className={`mt-2 px-4 py-2 rounded-md text-white font-semibold ${
              posting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {posting ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </div>
    </div>
  );
}
