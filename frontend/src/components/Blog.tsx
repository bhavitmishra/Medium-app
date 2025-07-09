import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { useEffect } from "react";

interface Props {
  id?: string;
  blogId?: string;
  title?: string;
  content?: string;
  author?: string;
}

export default function Blog({ id, blogId, title, content, author }: Props) {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect to landing page
    }
  }, []);

  const handleNavigate = () => {
    navigate(`/blogPage?blogid=${blogId}&name=${author}&authorid=${id}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="flex flex-col md:flex-row justify-between gap-8 bg-white shadow-md p-6 mb-6 rounded-xl cursor-pointer hover:bg-gray-50 transition"
    >
      {/* Blog Content */}
      <div className="md:w-3/4">
        <h2 className="font-bold text-3xl mb-4">{title}</h2>
        <div
          className="text-lg text-gray-700 leading-relaxed break-words"
          dangerouslySetInnerHTML={{
            //@ts-ignore
            __html: DOMPurify.sanitize(content.slice(0, 200) + "..."),
          }}
        />
      </div>

      {/* Author Info */}
      <div className="md:w-1/4 bg-gray-100 rounded-lg p-4 text-sm text-gray-800">
        <h3 className="font-semibold text-lg mb-1">Author</h3>
        <h2 className="font-bold text-md mb-1">{author}</h2>
      </div>
    </div>
  );
}
