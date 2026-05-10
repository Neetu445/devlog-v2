import {useState} from "react";
import axios from "axios";

function Login(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const handleLogin = async () =>{
        try{
            const res = await axios.post("http://localhost:5000/login",{
                email,
                password,
            });

            console.log("Login success:", res.data);
            //store token
            localStorage.setItem("token", res.data.token);

            alert("login successful");
        }catch(err){
            console.log(err);
            alert("Login failed");
        }
    };

    return(
        <div style={{padding:"20px"}}>
            <h2>Login</h2>
            <input type ="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <br /><br />
        </div>
    );

}
export default Login;