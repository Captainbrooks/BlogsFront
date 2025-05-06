import React, { useEffect, useState } from "react";
import { useBlogContext } from "../hooks/useBlogContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { BsCheck, BsX } from "react-icons/bs";
import { message } from "antd";

function BlogEditForm({ blog, edit, setEdit, setShowBlog, showBlog }) {
  const { dispatch } = useBlogContext();
  const { user } = useAuthContext();

  const [editedtitle, setEditedTitle] = useState("");
  const [editedbody, setEditedBody] = useState("");
  const [editedauthor, setEditedAuthor] = useState("");

  const handleCancel = () => {
    setEdit(false);
  };

  useEffect(() => {
    setEditedTitle(blog.title);
    setEditedBody(blog.body);
    setEditedAuthor(blog.author);
  }, [blog]);

  const handleSave = async () => {
    const editedBlog = {
      title: editedtitle,
      body: editedbody,
      author: editedauthor,
    };

    const response = await fetch(
      `http://localhost:7000/api/blogs/${blog._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(editedBlog),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      message.error("Failed to update the blog");
      return;
    }

    dispatch({ type: "EDIT_BLOGS", payload: json });
    message.success("Blog updated successfully");
    setEdit(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Editing Blog: <span className="text-red-600">{blog.title}</span>
      </h2>

      {edit && (
        <form className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium">Title:</label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              value={editedtitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Body:</label>
            <textarea
              rows={6}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              value={editedbody}
              onChange={(e) => setEditedBody(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Author:</label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              value={editedauthor}
              onChange={(e) => setEditedAuthor(e.target.value)}
              required
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
            >
              <BsCheck className="mr-2" /> Save Changes
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
            >
              <BsX className="mr-2" /> Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default BlogEditForm;
