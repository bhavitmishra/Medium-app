import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, Underline as UnderlineIcon } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect to landing page
    }
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: "Start writing your blog content here...",
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  const handleFormat = (command: string) => {
    if (!editor) return;
    //@ts-ignore
    editor.chain().focus()[command]().run();
  };

  const handlePublish = async () => {
    if (!title || !content) return;

    try {
      await axios.post(
        "https://backend.bhavitmishra.workers.dev/api/v1/blog/",
        { title, content },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      setShowSuccess(true);
    } catch (err) {
      console.error("Failed to publish blog:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 relative">
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

      {/* Publish Button */}
      <div className="text-right">
        <button
          onClick={handlePublish}
          className="bg-green-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-green-700 transition"
        >
          Publish
        </button>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold mb-4">
              ✅ Blog Posted Successfully!
            </h2>
            <button
              onClick={() => {
                setShowSuccess(false);
                navigate("/dashboard");
              }}
              className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
