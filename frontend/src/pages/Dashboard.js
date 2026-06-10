import {Link } from "react-router-dom";

function Dashboard(){

      const token = localStorage.getItem("token");

     if (!token){
      return<h2>Please login</h2>
  }
    return(
        <div style={{ padding: "20px"}}>
            <h1>Devlog V2 Dashboard</h1>

            <p>Welcome back!</p>

            <br />

            <Link to="/create-post">
            <button>Create Post</button>
            </Link>

            <br /><br /> 
            
            <button>My Posts</button>

            <br /><br />

            <button>Profile</button>

            <br /><br />

<button
  onClick={() => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }}
>
  Logout
</button>

        </div>
    );
}

export default Dashboard;