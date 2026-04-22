import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, Underline as UnderlineIcon } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PublishPageHeader from "../components/PublishPageHeader";

type Props = {
  titlee?: string;
  contentt?: string;
};

export default function CreateBlog({ titlee = "", contentt = "" }: Props) {
  const [title, setTitle] = useState(titlee);
  const [content, setContent] = useState(contentt);
  const navigate = useNavigate();
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
  placeholder: "Start writing your story...",
  emptyEditorClass:
    "before:content-[attr(data-placeholder)] before:text-gray-400 before:float-left before:pointer-events-none",
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
  <div className="bg-white min-h-screen">

    <PublishPageHeader />

    <div className="max-w-3xl mx-auto px-6 py-10">

      {/* TITLE */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-5xl font-bold outline-none placeholder-gray-300 mb-6"
      />

      {/* TOOLBAR */}
      <div className="flex gap-2 mb-4 text-gray-600">
        <button
          onClick={() => handleFormat("toggleBold")}
          className="p-2 rounded hover:bg-gray-100"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => handleFormat("toggleItalic")}
          className="p-2 rounded hover:bg-gray-100"
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => handleFormat("toggleUnderline")}
          className="p-2 rounded hover:bg-gray-100"
        >
          <UnderlineIcon size={18} />
        </button>
      </div>

      {/* EDITOR */}
     <div className="min-h-[300px] text-lg leading-relaxed text-gray-800 border-b border-gray-300 focus-within:border-black px-1 py-2">
  <EditorContent
    editor={editor}
    className="outline-none"
  />
</div>

      {/* PUBLISH */}
      <div className="flex justify-end mt-10">
        <button
          onClick={handlePublish}
          className="bg-black text-white px-6 py-2 rounded-full text-sm hover:opacity-90 transition"
        >
          Publish
        </button>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-3">
              Blog published 🎉
            </h2>
            <button
              onClick={() => {
                setShowSuccess(false);
                navigate("/dashboard");
              }}
              className="mt-2 px-5 py-2 bg-black text-white rounded-full"
            >
              Continue
            </button>
          </div>
        </div>
      )}

    </div>
  </div>
);
}
