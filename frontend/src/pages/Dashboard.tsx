import Blogs from "../components/Blogs.tsx";
import DashHeader from "../components/DashHeader";

export default function Dashboard() {
  return (
    <div>
      <DashHeader />
      <div className="h-20 font-bold text-3xl px-10 py-10">Blogs</div>
      <Blogs />
    </div>
  );
}
