import React, { useState } from "react";
import { useBlogContext } from "../hooks/useBlogContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { BsCheck, BsX } from "react-icons/bs";
import { message } from "antd";

function BlogForm({ setShowBlog, setShowForm, setLoading, setErrorMessage, errormessage }) {
  const { blogs, dispatch } = useBlogContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const blog = { title, body, author };

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/blogs`, {
      method: "POST",
      body: JSON.stringify(blog),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "ADD_BLOGS", payload: json });
      message.success("Blog Added");
      setTitle("");
      setBody("");
      setAuthor("");
      setError(null);
      setShowForm(false);
      setShowBlog(true);
    } else {
      setError(json.error);
    }

    setLoading(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setShowBlog(true);

    if (blogs && blogs.length > 0) {
      setErrorMessage("");
    } else {
      setErrorMessage("No Blogs Found");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Create a Blog</h1>
      <form onSubmit={formSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Title:</label>
          <input
            type="text"
            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Body:</label>
          <textarea
            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={6}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Author:</label>
          <input
            type="text"
            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div className="flex space-x-4 mt-6">
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            <BsCheck className="mr-2" /> Add
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            <BsX className="mr-2" /> Cancel
          </button>
        </div>
      </form>

      {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}
    </div>
  );
}

export default BlogForm;
