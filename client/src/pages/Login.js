import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// This page allows users to log in by entering their username and password. When the "Login" button is clicked, it sends a POST request to the backend API with the credentials. If the login is successful, it stores the returned token in localStorage and redirects the user to the dashboard. If the login fails, it shows an alert message.
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
  axios.post("http://localhost:5000/auth/login", {
    username,
    password
  })
  .then(res => {
    localStorage.setItem("token", res.data.token);
    window.location.href = "/dashboard";
  })
  .catch(err => {
    console.log(err.response?.data || err.message);
    alert("Login failed");
  });
};

  return (
    <div>
      <h1>Login</h1>
      <input placeholder="username" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p>
  Don't have an account? <Link to="/register">Register</Link>
</p>
    </div>
  );
}


export default Login;