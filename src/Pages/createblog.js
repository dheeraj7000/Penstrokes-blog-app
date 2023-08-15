import React, { useContext, useState} from "react";
import './widget/widget.css';
import {Form} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Blogs from "./blogs";
import { BlogContext } from "./BlogContext";

{/*change*/}
function CreateBlog() {
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    author: '',
    imgurl: '',
  });

  const CreateNewPostMutation = /* GraphQL */ `
    mutation CreateNewPost($title: String!, $content: String!, $author: String!, $imgurl: String!) {
      postCreate(input: { title: $title, content: $content, author: $author, imgurl: $imgurl }) {
        post {
          id
          title
          content
          author
          imgurl
        }
      }
    }
  `;

const CreateBlogWidget = async () => {

  try {
    const response = await fetch('https://grafblog-main-dheeraj7000.grafbase.app/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTIwMTM4NjcsImlzcyI6ImdyYWZiYXNlIiwiYXVkIjoiMDFIN1NZNUJYVFkzWkE0U005R1BWNVgyTU0iLCJqdGkiOiIwMUg3U1k1Q0g2WDlYWUVNREpERllEQlBaSCIsImVudiI6InByb2R1Y3Rpb24iLCJwdXJwb3NlIjoicHJvamVjdC1hcGkta2V5In0.uGiW1MvgSJqow8UCPoUIA8QaKGfX6oIniN0ioHMbwt8', // Replace with your actual API key
      },
      body: JSON.stringify({
        query: CreateNewPostMutation,
        variables: {
          title: newBlog.title,
          content: newBlog.content,
          author: newBlog.author,
          imgurl: newBlog.imgurl,
        },
      }),
    });

    const result = await response.json();

    if (result.data && result.data.postCreate) {
      console.log('Post created successfully:', result.data.postCreate.post);
    } else {
      console.error('Failed to create post.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};


  return (
    <div className="createpostmain">
    <div className="form-main">
      <div className="blog-form">
        <form onSubmit={CreateBlogWidget}>
          <h1 style={{ fontWeight: "bold", textAlign: "center", fontFamily: "Arial, sans-serif", marginBottom: "1.5em" }}>
            CREATE YOUR BLOG
          </h1>

          <div className="mb-3">
            <label>TITLE</label>
            <input
              type="text"
              className="form-control"
              placeholder="This title will be displayed at the top of your blog"
              name="blogname"
              value={newBlog.title}
              onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>CONTENT</Form.Label>
              <Form.Control
                as="textarea"
                rows={7}
                placeholder="write your blog here..."
                name="content"
                value={newBlog.content}
                onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                required
              />
            </Form.Group>
          </div>

          <div className="mb-3">
            <label>AUTHOR</label>
            <input
              type="text"
              className="form-control"
              placeholder="writer's name"
              name="author"
              value={newBlog.author}
              onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
              required
            />
          </div>
          
          <div className="mb-3">
            <label>UPLOAD IMAGE FOR BLOG</label>
            <input
              type="text"
              className="form-control"
              placeholder="paste image url for this blog"
              name="imgurl"
              value={newBlog.imgurl}
              onChange={(e) => setNewBlog({ ...newBlog, imgurl: e.target.value })}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary py-3 px-3">
            SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default CreateBlog;