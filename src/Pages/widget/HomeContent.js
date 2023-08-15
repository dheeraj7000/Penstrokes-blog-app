import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function HomeContent() {
  const navigate=useNavigate();
  return (
    <div className="bg">
      <div className="homecontent">
        <h2 className="homecontent-head1"><b>JUST WRITE IT DOWN</b></h2>
        <br />
        <br />
        <br />
        <Button className="btn1" onClick={()=>navigate("/createblog")}> WRITE YOUR THOUGHT</Button>
        &nbsp;&nbsp;
        <Button variant="primary" className="btn2" onClick={()=>navigate("/blogs")}>
          READ NEW BLOGS
        </Button>
      </div>
    </div>
  );
}
