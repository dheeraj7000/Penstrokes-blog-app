import React from 'react'
import {Nav,Navbar,Container} from 'react-bootstrap';
import './widget.css';
export default function Header() {
  return (
    <div>
        <Navbar expand="lg" className="navbg">
        {/* className="bg-body-tertiary" */}
        <Container>
          <Navbar.Brand href="#home" className="fs-3 text-white text-center"><b>Pҽɳʂƚɾσƙҽʂ</b></Navbar.Brand>
          
        </Container>
      </Navbar>
    </div>
  )
}
