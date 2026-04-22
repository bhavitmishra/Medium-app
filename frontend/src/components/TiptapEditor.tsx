import { useEditor, EditorContent } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";

type Props = {
  onChange: (content: string) => void;
  initialContent?: string;
};

export default function TiptapEditor({ onChange, initialContent = "" }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing your story...",
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="min-h-[300px] text-lg leading-relaxed text-gray-800">
      <EditorContent editor={editor} className="outline-none" />
    </div>
  );
}