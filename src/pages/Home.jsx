import { useEffect, useState } from "react";
import BlogDetails from "../components/BlogDetail";
import BlogForm from "../components/BlogForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { useBlogContext } from "../hooks/useBlogContext";
import Loading from "../components/Loading";
import { message } from "antd";

function Home() {
  const { blogs, dispatch } = useBlogContext();
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const [showBlog, setShowBlog] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/blogs`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        const json = await response.json();
        
        if (response.ok) {
          dispatch({ type: "SHOW_BLOGS", payload: json });
          setErrorMessage(json.length > 0 ? "" : "No Blogs Found");
        } else {
          message.error("Failed to fetch blogs");
          setErrorMessage("Error fetching blogs");
        }
      } catch (error) {
        message.error("Network error");
        setErrorMessage("Network error, please try again.");
      }
      setLoading(false);
    };

    fetchBlogs();
  }, [dispatch, user]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <button
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        onClick={() => {
          setShowForm(true);
          setShowBlog(false);
        }}
      >
        Create New Blog
      </button>

      {showForm && (
        <BlogForm
          setShowBlog={setShowBlog}
          setShowForm={setShowForm}
          setErrorMessage={setErrorMessage}
          setLoading={setLoading}
        />
      )}

      {loading && <Loading />}

      {showBlog && blogs ? (
        blogs.map((blog) => (
          <BlogDetails
            key={blog._id}
            blog={blog}
            setLoading={setLoading}
            setErrorMessage={setErrorMessage}
            showBlog={showBlog}
            setShowBlog={setShowBlog}
          />
        ))
      ) : (
        !loading && <p className="text-center text-gray-600 mt-4">{errorMessage}</p>
      )}
    </div>
  );
}

export default Home;
