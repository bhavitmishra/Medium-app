import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

interface Props {
  id: string;
  blogId: string;
  title: string;
  content: string;
  author: string;
}

export default function Blog({ id, blogId , title, content, author }: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blogPage?blogid=${blogId}&name=${author}&authorid=${id}`)}
      className="flex flex-col md:flex-row justify-between gap-8 bg-white shadow-sm p-6 rounded-xl cursor-pointer hover:bg-gray-50 hover:shadow-md transition"
    >
      {/* CONTENT */}
      <div className="md:w-3/4">
        <h2 className="font-bold text-2xl leading-snug tracking-tight mb-3">
          {title}
        </h2>

        <div
          className="text-gray-700 text-base leading-relaxed line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(content.slice(0, 200) + "..."),
          }}
        />
      </div>

      {/* AUTHOR */}
      <div className="md:w-1/4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
          {author[0]}
        </div>

        <div className="text-sm text-gray-600">
          {author}
        </div>
      </div>
    </div>
  );
}