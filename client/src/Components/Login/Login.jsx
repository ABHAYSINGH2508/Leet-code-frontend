// import React from 'react'

import "./Login.css"

import React, { useState } from 'react'


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      localStorage.setItem("token", json.token);
      console.log("Server Response:", json);
    } catch (error) {
      console.error("Error during signup:", error.message);
    }
  };

  return (
    <div id="login" className='flex-col'>
      <h1>Login</h1>
      <div className='signup-form' >

        <div className="subform">
          <label htmlFor="email">Email: </label>
          <input
            onChange={(e) => {
              // alert(e.target.value);
              setEmail(e.target.value);
            }}
            type="email"
            name="email"
            placeholder="Your Email"
          />
        </div>

        <div className="subform">
          <label htmlFor="password">Password: </label>
          <input
            onChange={(e) => {
              // alert(e.target.value);
              setPassword(e.target.value);
            }}
            type="text"
            name='password'
            placeholder='Your Password'
          />
        </div>

        <button type="submit" id="test" onClick={handleSignup}>
          LOGIN
        </button>


      </div>
    </div>
  )
}

export default Login;