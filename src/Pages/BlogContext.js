import React, { createContext, useContext, useState } from 'react';

export const BlogContext = createContext();

export function BlogProvider({ children }) {
  const [blogPost, setBlogPost] = useState(null);

  return (
    <BlogContext.Provider value={{ blogPost, setBlogPost }}>
      {children}
    </BlogContext.Provider>
  );
}
