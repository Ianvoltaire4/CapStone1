import React from 'react'
import './signup.css'
import { Nav } from 'react-bootstrap'
import { Navbar } from 'react-bootstrap'
import { NavDropdown } from 'react-bootstrap'
import {Container} from 'react-bootstrap'
import { Form } from 'react-bootstrap'


const SignUpPage = () => {
  return (
    <>

        <div id='Navbar'>
        <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </div>
<div className='split right'>
  <div className='righttxt'>
  <h2>Welcome to Beyond Tech</h2>
  <h4>Sign Up</h4>
</div>
    <div id='sign-box'>
        <Form action='/signup' method='post'>
          <input type='Text' id='FirstName' name='FName' maxLength="20" placeholder='First Name'></input><br></br>
          <input type='text' id='Last Name' name='LName' maxLength="20" placeholder='Last Name'></input><br></br>
          <input type='email' id='email' name='email'maxLength="30" placeholder='Enter Email'></input><br></br>
          <input type='text' id='username' name='UName' maxLength="25" placeholder='Create Username'></input><br></br>
          <input type='text' id='password' name='Pass' maxLength="25" placeholder='Create Password'></input><br></br>
          <input type='text' id='password' name='Pass' maxLength="25" placeholder='Renter Password'></input><br></br>
        <button className='subttn'>Create your Account</button>
        </Form>
       <p>Already Have an Account?<a href="/LoginPage">Sign In</a></p>
  </div>
    <div className='split left'>
      <div className='centered'>
      <h2>Beyond Tech</h2>
      <p>blah, blah</p>
      <img className='softwarepic' src="/images/softwareimg.jpeg" alt="" />
      </div>
    </div>
    </div>
    </>
  )
}

export default SignUpPage