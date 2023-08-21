import React, { useContext, useState, useEffect } from "react";
import { BlogContext } from "./BlogContext";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Blogs() {
  const navigate=useNavigate();
  const [blog, setBlog] = useState(null)

  const GetAllMessagesQuery = /* GraphQL */ `
  {
    postCollection(first: 20) {
      edges {
        node {
          id
          title
          content
          author
          imgurl
        }
      }
    }
  }

  `

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://grafblog-main-dheeraj7000.grafbase.app/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTIwMTM4NjcsImlzcyI6ImdyYWZiYXNlIiwiYXVkIjoiMDFIN1NZNUJYVFkzWkE0U005R1BWNVgyTU0iLCJqdGkiOiIwMUg3U1k1Q0g2WDlYWUVNREpERllEQlBaSCIsImVudiI6InByb2R1Y3Rpb24iLCJwdXJwb3NlIjoicHJvamVjdC1hcGkta2V5In0.uGiW1MvgSJqow8UCPoUIA8QaKGfX6oIniN0ioHMbwt8'
        },
        body: JSON.stringify({
          query: GetAllMessagesQuery,
          variables: {
            first: 10
          }
        })
      })

      const result = await response.json()
      setBlog(result)
    }

    fetchData()
  })


  return (
    
    <div className="blogs-main">
      <div className="blogs-box">
        {blog?.data?.postCollection?.edges?.map(({ node }) => (
          <Card
            key={node.id}
            style={{
              width: "20rem",
              margin: "60px 25px 2px",
              padding: "20px 15px",
            }}
          >
            <Card.Body>
              <img src={node.imgurl} alt="" width="250" />
              <Card.Title>
                <p>{node.title}</p>
              </Card.Title>
              <Button variant="primary" onClick={() => navigate(`/ReadBlogContent/${node.id}`)}>Read More</Button>
              {/* Use `node.id` for routing */}
            </Card.Body>
          </Card>
        ))}
      </div>
      <div className="blogs-backto">
        <p className="blogs-backto-para"><b>
</b></p>
        <Button onClick={() => navigate("/createblog")}>Create your blog</Button>
        <Button onClick={()=>navigate("/Penstrokes-blog-app")} >Home</Button>
      </div>
      
    </div>
  );
  
}
