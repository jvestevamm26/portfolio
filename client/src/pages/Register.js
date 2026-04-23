import { useState } from "react";
import axios from "axios";

// This page is for new users to create an account. It sends a POST request to the backend with the username, email, and password. If registration is successful, it redirects to the login page.
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle registration
  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/auth/register", {
        username,
        email,
        password,
      });

      alert("Registered successfully!");
      window.location.href = "/login";
    } catch (err) {
      console.log(err.response?.data);
      alert("Registration failed");
    }
  };
// Render the registration form
  return (
    <div style={{ padding: 20 }}>
      <h2>Register</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;