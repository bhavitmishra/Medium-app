// components/TiptapEditor.tsx
import { useEditor, EditorContent } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

export default function TiptapEditor() {
  // @ts-ignore
  const [content, setContent] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing your blog here...",
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  return (
    <div className="border rounded-xl p-4 shadow-md">
      <EditorContent editor={editor} className="prose max-w-none" />
    </div>
  );
}
