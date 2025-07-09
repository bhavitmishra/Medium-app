import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, Underline as UnderlineIcon } from "lucide-react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import PublishPageHeader from "../components/PublishPageHeader";

export default function UpdateBlog() {
  const [searchParams] = useSearchParams();
  const blogid = searchParams.get("id");
  const initialTitle = searchParams.get("title") || "";
  const initialContent = searchParams.get("content") || "";

  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: "Start writing your blog content here...",
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleFormat = (command: string) => {
    if (!editor) return;
    // @ts-ignore
    editor.chain().focus()[command]().run();
  };

  const handlePublish = async () => {
    if (!title.trim() || !content.trim() || !blogid) {
      alert("Missing title, content, or blog ID");
      return;
    }

    setIsLoading(true);
    console.log("Sending update with:", { blogid, title, content });

    try {
      const res = await axios.put(
        "https://backend.bhavitmishra.workers.dev/api/v1/blog/",
        {
          id: blogid,
          title,
          content,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      console.log("Update success:", res.data);
      navigate("/userblog"); // REMOVE setTimeout for now
    } catch (error) {
      console.error("Update failed:", error);
      alert("Update failed. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 relative">
      <PublishPageHeader />

      {/* Title Input */}
      <input
        type="text"
        placeholder="Enter blog title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-xl text-xl font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Formatting Toolbar */}
      <div className="flex gap-3 items-center border rounded-xl p-2 bg-gray-100">
        <button
          onClick={() => handleFormat("toggleBold")}
          className="p-2 hover:bg-gray-200 rounded"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => handleFormat("toggleItalic")}
          className="p-2 hover:bg-gray-200 rounded"
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => handleFormat("toggleUnderline")}
          className="p-2 hover:bg-gray-200 rounded"
        >
          <UnderlineIcon size={18} />
        </button>
      </div>

      {/* Editor */}
      <div className="border rounded-xl shadow-sm p-4 min-h-[200px]">
        <EditorContent editor={editor} className="prose max-w-none" />
      </div>

      {/* Update Button */}
      <div className="text-right">
        <button
          onClick={handlePublish}
          disabled={isLoading}
          className="bg-green-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-green-700 transition disabled:opacity-60"
        >
          {isLoading ? "Updating..." : "Update Blog"}
        </button>
      </div>

      {/* Loader Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center flex flex-col items-center gap-3">
            <svg
              className="animate-spin h-8 w-8 text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <p className="text-lg font-medium">Updating Blog...</p>
          </div>
        </div>
      )}
    </div>
  );
}
