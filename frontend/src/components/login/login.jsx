import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../dashboard/LoginContext';
import axios from 'axios';
function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { onSuccessLogin } = useLogin();
  const history = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user/login', {
        email,
        password
      });

      if (response.status === 200) {
        // console.log(token);
        // localStorage.setItem("userID", response.data.token);
        // alert('Login successful');
        sessionStorage.setItem("userID", response.data.userID)
        sessionStorage.setItem("userEmail", response.data.userEmail)
        onSuccessLogin();
        history('/dashboard');
        
      } else {
        alert(response.data.error)
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred while processing your request.');
      }
    }
  };


  // useEffect(() => {
  //   document
  //     .getElementById("loginForm")
  //     .addEventListener("submit", function (e) {
  //       e.preventDefault();
  //       validateLoginForm();
  //     });
  // });

  // function validateLoginForm() {
  //   const loginUsername = document.getElementById("loginUsername").value;
  //   const loginPassword = document.getElementById("loginPassword").value;

  //   // Assuming you have a list of user credentials from the signup process
  //   const signupUsername = "Aayushi_Choksi";
  //   const signupPassword = "@Stompingbull1304";

  //   // Check if the entered username and password match the signup credentials
  //   if (loginUsername === signupUsername && loginPassword === signupPassword) {
  //     alert("Login successful!");
  //     // You can add code here to redirect the user or perform other actions after successful login
  //   } else {
  //     alert("Invalid username or password");
  //   }
  // }

  return (
    <div className="login-body card login-card">
      <div class="login-container card-body">
        <h2 class="text-center mb-5 display-4">Login</h2>
        <form id="loginForm" onSubmit={handleLogin}>
          <div className="form-group">
          <label for="loginUsername" >Email:</label>
          <input id="loginUsername" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
          </div>
          <div className="form-group">
          <label for="loginPassword">Password:</label>
          <input type="password" id="loginPassword" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
          </div>
          <div id="passwordError" class="error"></div>
          <button class="btn btn-primary btn-block btn-lg" type="submit">
            Login
          </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
