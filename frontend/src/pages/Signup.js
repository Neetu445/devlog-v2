import {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function Signup(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () =>{
        try{
            const res = await axios.post("http://localhost:5000/signup", {
                username,
                email,
                password,
            });

            console.log(res.data);
            alert("Signup successful");
        }catch(err){
            console.log(err);
            alert("Signup failed");
        }
    };

    return(
        <div style ={{padding: "20px"}}>
        <h2>Signup</h2>

        <input 
        placeholder="username"
        onChange ={(e) => setUsername(e.target.value)} />
        <br /><br />

        <input 
        placeholder="Email"
        type="email"
        onChange ={(e) => setEmail(e.target.value)} />
        <br /><br />


        <input 
        placeholder="password"
        type="password"
        onChange ={(e) => setPassword(e.target.value)} />
        <br /><br />

        <button  onClick ={handleSignup}>Signup</button>

        <p>Already have an account? <Link to="/login">Login</Link>
        </p>
        </div>
    );

}
export default Signup;
