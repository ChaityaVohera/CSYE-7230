import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Signup() {
  //usestate for backend
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();
  // for frontend autentication
  const [oldPassword, SetOldPassword] = useState("");
  const [usernameE, setUsernameE] = useState(true);

  const UserContainerStyle = {
    display: usernameE ? "none" : "block",
  };

  const [emailE, setEmailE] = useState(true);
  const EmailContainerStyle = {
    display: emailE ? "none" : "block",
  };

  const [passwordE, setPasswordE] = useState(true);
  const PasswordContainerStyle = {
    display: passwordE ? "none" : "block",
  };

  const [passwordCapE, setPasswordCapE] = useState(true);
  const PasswordContainerCapStyle = {
    display: passwordCapE ? "none" : "block",
  };
  const [passwordSmaE, setPasswordSmaE] = useState(true);
  const PasswordContainerSmaStyle = {
    display: passwordSmaE ? "none" : "block",
  };
  const [passwordChaE, setPasswordChaE] = useState(true);
  const PasswordContainerChaStyle = {
    display: passwordChaE ? "none" : "block",
  };
  const [passwordDigE, setPasswordDigE] = useState(true);
  const PasswordContainerDigStyle = {
    display: passwordDigE ? "none" : "block",
  };

  const [confirmPasswordE, setConfirmPasswordE] = useState(true);
  const ConfirmPasswordContainerStyle = {
    display: confirmPasswordE ? "none" : "block",
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user/create', {
        fullName,
        email,
        password
      });

      if (response.status === 201) {
        console.log("success")
        history('/login')
        // alert('Signup successful');
        // history('/home');
      }
      // else if (response.status === 400) {
      //   alert("Registration Failed");
      // }
    } catch (error) {
      // console.log(error.response);
      console.log("in")
      if (error.response) {
        setError(error.response.data.error);
        setEmail('');
      } else {
        setError('An error occurred while processing your request.');
      }
    }
  };

  const validateUsername1 = (u) => {
    const username = u;
    if (username.trim() === "") {
      setUsernameE(false);
    }

    const minLength = 3;
    const maxLength = 20;
    const validCharacters = /^[a-zA-Z0-9_]+$/; // Alphanumeric and underscore

    if (username.length < minLength || username.length > maxLength) {
      setUsernameE(false);
    } else if (!validCharacters.test(username)) {
      setUsernameE(false);
    } else {
      setUsernameE(true);
    }
  };

  const validateEmail = (e) => {
    const email = e;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailE(false);
    } else {
      setEmailE(true);
    }
  };

  const validatePassword = (p) => {
    const password = p;
    SetOldPassword(p);
    if (password.length < 8) {
      setPasswordE(false);
    } else {
      setPasswordE(true);
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordCapE(false);
    } else {
      setPasswordCapE(true);
    }
    if (!/[a-z]/.test(password)) {
      setPasswordSmaE(false);
    } else {
      setPasswordSmaE(true);
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordChaE(false);
    } else {
      setPasswordChaE(true);
    }
    if (!/\d/.test(password)) {
      setPasswordDigE(false);
    } else {
      setPasswordDigE(true);
    }
  };

  const validateConfirmPassword = (c) => {
    console.log("old : " + oldPassword);
    console.log("new : " + c);

    const confirmPassword = c;
    if (oldPassword != confirmPassword) {
      setConfirmPasswordE(false);
    } else {
      setConfirmPasswordE(true);
    }
  };

  return (
    <div className="login-con signup-container">
      <div className="card signup-card ">
        <div className="card-body">
          <div>
            <h2 class=" text-center mb-5 ">Sign Up</h2>
            <form id="signupForm" onSubmit={handleLogin}>
              <div className="form-group">
                <label for="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  required
                  // onChange={(e) => validateUsername1(e.target.value)}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label for="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  required
                  // onChange={(e) => validateEmail(e.target.value)}
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label for="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  required
                  // onChange={(e) => validatePassword(e.target.value)}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label for="confirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  // onChange={(e) => validateConfirmPassword(e.target.value)}
                />
              </div>

              <div id="usernameError" class="error" style={UserContainerStyle}>
                <h1>enter valid user name </h1>
              </div>
              <div id="emailError" class="error" style={EmailContainerStyle}>
                <h1>enter valid email</h1>
              </div>
              <div
                id="passwordError"
                class="error"
                style={PasswordContainerStyle}
              >
                <h1>password length must be atleast 8 characters</h1>
              </div>
              <div
                id="passwordError"
                class="error"
                style={PasswordContainerCapStyle}
              >
                <h1>password must have 1 capital letter</h1>
              </div>
              <div
                id="passwordError"
                class="error"
                style={PasswordContainerSmaStyle}
              >
                <h1>password must have 1 small letter</h1>
              </div>
              <div
                id="passwordError"
                class="error"
                style={PasswordContainerChaStyle}
              >
                <h1>password must have atleast 1 special characters</h1>
              </div>
              <div
                id="passwordError"
                class="error"
                style={PasswordContainerDigStyle}
              >
                <h1>password must have atleast 1 number</h1>
              </div>
              <div
                id="confirmPasswordError"
                class="error"
                style={ConfirmPasswordContainerStyle}
              >
                <h1>password does not match</h1>
              </div>

              <button btn btn-primary btn-block btn-lg type="submit">Sign Up</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
