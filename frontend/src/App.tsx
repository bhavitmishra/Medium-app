import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import BlogPage from "./pages/BlogPage";
import BlogCreate from "./pages/BlogCreate";
import UserBlogs from "./pages/UserBlogs";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blogPage" element={<BlogPage />} />
          <Route path="/blogpublish" element={<BlogCreate />} />
          <Route path="/userblog" element={<UserBlogs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
