import { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();



  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      console.log(res.data);

      // store token
      localStorage.setItem("token", res.data.token);
      
      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>

      <p>Don't have account? <Link to="/signup"></Link></p>
    </div>
  );
}

export default Login;