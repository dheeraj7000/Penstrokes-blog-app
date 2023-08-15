import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
// import { BlogContext } from "./BlogContext";

function Setpost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    author: "",
    imgurl: "",
  });

  useEffect(() => {
    async function fetchPostData() {
      const GetAllMessagesQuery = /* GraphQL */ `
        query GetPostById($id: ID!) {
          post(by: { id: $id }) {
            id
            title
            content
            author
            imgurl
            createdAt
          }
        }
      `;

      try {
        const response = await fetch("https://grafblog-main-dheeraj7000.grafbase.app/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTIwMTM4NjcsImlzcyI6ImdyYWZiYXNlIiwiYXVkIjoiMDFIN1NZNUJYVFkzWkE0U005R1BWNVgyTU0iLCJqdGkiOiIwMUg3U1k1Q0g2WDlYWUVNREpERllEQlBaSCIsImVudiI6InByb2R1Y3Rpb24iLCJwdXJwb3NlIjoicHJvamVjdC1hcGkta2V5In0.uGiW1MvgSJqow8UCPoUIA8QaKGfX6oIniN0ioHMbwt8'
          },
          body: JSON.stringify({
            query: GetAllMessagesQuery,
            variables: {
              id: id,
            },
          }),
        });

        const result = await response.json();

        if (result.data && result.data.post) {
          console.log("Post retrieved successfully:", result.data.post);
          setNewPost(result.data.post); // Update the state with retrieved post data
        } else {
          console.error("Failed to retrieve post.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    fetchPostData();
  }, [id]); // Fetch post data when the ID changes

  return (
    <div className='readblogmain'>
      <h1 className='readblog-mainhead'>{newPost.title}</h1>
      <div className='readblog-author'>
        <hr/>
            <span style={{ fontFamily: "sans-serif",marginLeft:"1em" }}><i class='bx bx-edit-alt' style={{fontSize:"1.2em"}}>:</i>{newPost.author}</span>
            <span className='readblog-date'><b>Published:{newPost.createdAt}</b></span>
            <hr/>
        </div>
        <div className='readblog'>
          <img src={newPost.imgurl} className="" alt=''/>
        <p className='readblogcontent'>{newPost.content}</p>
        <Button variant="success" onClick={()=>navigate("/blogs")} style={{marginLeft:"2.5em",padding:"10px 14px"}} >Back To Blogs</Button>
        <Button variant="success" onClick={()=>navigate(`/deletePost/${newPost.id}`)} style={{marginLeft:"5em",padding:"10px 14px"}} >Delete this Blog</Button>
        </div>
    </div>
  );
}

export default Setpost;
