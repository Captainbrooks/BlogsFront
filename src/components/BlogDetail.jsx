import React, { useEffect, useState } from "react";
import BlogEditForm from "./BlogEditForm";
import { useBlogContext } from "../hooks/useBlogContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { BsTrash, BsPencil } from "react-icons/bs";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { message } from "antd";

function BlogDetails({ blog, setLoading, setErrorMessage, showBlog, setShowBlog }) {
  const [edit, setEdit] = useState(false);
  const { dispatch, blogs } = useBlogContext();
  const { user } = useAuthContext();

  const handleDelete = async () => {
    if (!user) return;

    setLoading(true);
    const response = await fetch(`http://localhost:7000/api/blogs/${blog._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_BLOGS", payload: json });
      setLoading(false);
      message.success("Blog deleted");

      const remainingBlogs = blogs.filter((b) => b._id !== blog._id);
      if (remainingBlogs.length === 0) {
        setErrorMessage("No Blogs Found");
      } else {
        setErrorMessage("");
      }
    } else {
      message.error("Failed to delete blog");
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEdit(true);
  };

  return (
    <div className="px-4 py-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{blog.title}</h2>
        <p className="text-gray-700 mb-4">{blog.body}</p>
        <p className="text-sm text-gray-500 mb-1">
          Written By: <span className="font-semibold text-gray-700">{blog.author}</span>
        </p>
        <p className="text-xs text-gray-400">
          {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
        </p>

        <div className="mt-4 flex gap-4">
          <button
            onClick={handleDelete}
            className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
          >
            <BsTrash className="mr-2" /> Delete
          </button>

          <button
            onClick={handleEdit}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
          >
            <BsPencil className="mr-2" /> Edit
          </button>
        </div>
      </div>

      {edit && (
        <BlogEditForm
          blog={blog}
          edit={edit}
          setEdit={setEdit}
          setShowBlog={setShowBlog}
          showBlog={showBlog}
        />
      )}
    </div>
  );
}

export default BlogDetails;
