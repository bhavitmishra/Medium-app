import Blogs from "../components/Blogs.tsx";
import DashHeader from "../components/DashHeader";

export default function Dashboard() {
  return (
    <div>
      <DashHeader />
      <br />
      <br />
      <Blogs />
    </div>
  );
}
