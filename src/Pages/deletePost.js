import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export default function DeleteBlogs() {
  const navigate = useNavigate();
  const { id } = useParams();

  const DelPost = /* GraphQL */ `
    mutation DeletePostById($id: ID!) {
      postDelete(by: { id: $id }) {
        deletedId
      }
    }
  `;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://grafblog-main-dheeraj7000.grafbase.app/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTIwMTM4NjcsImlzcyI6ImdyYWZiYXNlIiwiYXVkIjoiMDFIN1NZNUJYVFkzWkE0U005R1BWNVgyTU0iLCJqdGkiOiIwMUg3U1k1Q0g2WDlYWUVNREpERllEQlBaSCIsImVudiI6InByb2R1Y3Rpb24iLCJwdXJwb3NlIjoicHJvamVjdC1hcGkta2V5In0.uGiW1MvgSJqow8UCPoUIA8QaKGfX6oIniN0ioHMbwt8'
          },
          body: JSON.stringify({
            query: DelPost,
            variables: {
              id: id
            }
          })
        });

        const result = await response.json();
        // Handle the result, for example, show a success message or navigate back
        console.log("Deletion result:", result);
        navigate("/"); // Navigate back to the home page
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchData();
  }, [id, navigate]);

}
