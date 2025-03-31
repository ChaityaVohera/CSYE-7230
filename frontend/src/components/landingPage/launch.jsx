import React from "react";
import { Link } from "react-router-dom";
function Launch() {
  document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");

    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      validateSignupForm();
    });

    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      validateLoginForm();
    });

    function validateSignupForm() {
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      clearErrors();

      if (!isValidEmail(email)) {
        displayError("Invalid email format", "emailError");
      }

      if (password !== confirmPassword) {
        displayError("Passwords do not match", "passwordError");
      }

      const passwordValidationResult = validatePassword(password);
      if (!passwordValidationResult.isValid) {
        const errorMessage = `Invalid password format. Requirements:`;
        displayError(
          errorMessage,
          "passwordError",
          passwordValidationResult.message
        );
      }

      if (
        isValidEmail(email) &&
        password === confirmPassword &&
        passwordValidationResult.isValid
      ) {
        alert(`Sign up successful!\nUsername: ${username}\nEmail: ${email}`);
      }
    }

    function validateLoginForm() {
      const loginUsername = document.getElementById("loginUsername").value;
      const loginPassword = document.getElementById("loginPassword").value;

      alert(`Log in successful!\nUsername: ${loginUsername}`);
    }

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    function validatePassword(password) {
      let requirements = [];

      if (password.length < 8) {
        requirements.push("Password must be at least 8 characters long");
      }

      if (!/[A-Z]/.test(password)) {
        requirements.push(
          "Password must contain at least one uppercase letter"
        );
      }

      if (!/[a-z]/.test(password)) {
        requirements.push(
          "Password must contain at least one lowercase letter"
        );
      }

      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        requirements.push(
          "Password must contain at least one special character"
        );
      }

      if (!/\d/.test(password)) {
        requirements.push("Password must contain at least one digit");
      }

      return { isValid: requirements.length === 0, message: requirements };
    }

    function displayError(message, errorId, bulletPoints = []) {
      const errorElement = document.createElement("div");
      errorElement.className = "error";
      errorElement.innerHTML = `<strong>${message}</strong>`;

      if (bulletPoints.length > 0) {
        const requirementsList = document.createElement("ul");
        for (const point of bulletPoints) {
          const listItem = document.createElement("li");
          listItem.textContent = point;
          requirementsList.appendChild(listItem);
        }
        errorElement.appendChild(requirementsList);
      }

      document.getElementById(errorId).appendChild(errorElement);
    }

    function clearErrors() {
      document.getElementById("emailError").innerHTML = "";
      document.getElementById("passwordError").innerHTML = "";
    }
  });
  return (
    <div className="login-body">
      <div class="landing-container text-center p-5">
        <h1>Welcome to Your Dating App!</h1>
        <h2>Find your perfect match...</h2>
        <div class="cta-buttons">
          <Link to="/signup">
            <button class="btn btn-primary btn-lg mr-2">Sign Up</button>
          </Link>
          <Link to="/login">
            <button class="btn btn-primary btn-lg">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Launch;
