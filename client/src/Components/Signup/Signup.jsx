import React, { useState } from 'react'

import "./Signup.css"
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch("http://localhost:3000/signup", {
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
      console.log("Server Response:", json);
    } catch (error) {
      console.error("Error during signup:", error.message);
    }
  };
  


  return (
    <div id="signup" className='flex-col'>
      <h1>Signup</h1>
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
        SIGNUP
      </button>


        {/* <button type="submit" id="test" onClick={handleSignup}>
          SIGNUP
        </button> */}


        {/* <button type='submit' id='test' onClick={async (e: MouseEvent<HTMLButtonElement>) => {
          const response = await fetch(input: "http://localhost:3000/signup", init{
            method: "POST",
            body: JSON.stringify(value:{
          email: email,
          password: password
        })
      });
        const json = await response.json();
        console.log(json);
      }}>SIGNUP </button>  */}




        {/* <button
          type="submit"
          id="test"
          onClick={async (e) => {
            e.preventDefault(); // Prevent the default form submission
            alert(email);
            alert(password);

            try {
              const response = await fetch("http://localhost:3000/signup", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json", // Ensure content type is JSON
                },
                body: JSON.stringify({
                  email: email, // Replace with actual state values
                  password: password, // Replace with actual state values
                }),
              });

              if (!response.ok) {
                const error = await response.json();
                alert(`Error: ${error.message}`);
                return;
              }

              const data = await response.json();
              alert("Signup successful!");
              console.log("Response Data:", data);
            } catch (err) {
              console.error("Error:", err);
              alert("Something went wrong. Please try again.");
            }
          }}
        >
          SIGNUP
        </button>  */}


      </div>
    </div >
  )
}

export default Signup