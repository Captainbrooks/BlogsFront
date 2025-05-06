import { createContext, useReducer } from "react";

export const BlogContext = createContext();



export const blogReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_BLOGS":
      return {
        blogs: action.payload,
      };
    case "ADD_BLOGS":
      return {
        blogs: [action.payload,...state.blogs],
      };

    case "DELETE_BLOGS":
      return {
        blogs: state.blogs.filter((blog) => blog._id !== action.payload._id),
      };

      case "EDIT_BLOGS":
        const updatedBlogIndex = state.blogs.findIndex(
          (blog) => blog._id === action.payload._id
        );
      
        if (updatedBlogIndex !== -1) {
          const updatedBlogs = [...state.blogs];
          updatedBlogs[updatedBlogIndex] = action.payload;
      
          return {
            ...state,
            blogs: [...updatedBlogs],
          };
        } else {
          return state;
        }
      
     default:{
return state
    }
  }
};

export function BlogContextProvider({ children }) {
  const [state, dispatch] = useReducer(blogReducer, {
    blogs: null
  });

  return (<BlogContext.Provider value={{...state,dispatch}}>{children}</BlogContext.Provider>);
};
