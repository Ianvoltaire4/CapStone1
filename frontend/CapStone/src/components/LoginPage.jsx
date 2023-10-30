import React from 'react'

const LoginPage = () => {
  return (
    <div id='login'>
    <p>Sign In</p>
      <Form action='/login' method='post'>
        <input type='email' id='email' name='email' placeholder='Enter Email' required></input>
        <input type='password' id='password' name='password' placeholder='Enter Password' required></input>
        <Button type='submit'>Sign In</Button>
        <p>Need to Create an Account?<Link to='./SignUpPage'>Click Here</Link></p>
        <p>Forgot Password?</p>
      </Form>
  </div>
  )
}

export default LoginPage