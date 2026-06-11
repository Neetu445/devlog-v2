import {Link } from "react-router-dom";

function Dashboard(){

      const token = localStorage.getItem("token");

     if (!token){
      return(
          <div style ={styles.center}>
              <h2>Please login</h2>
          </div>
      );
  }

    return(
        <div >
          { /* NAVBAR*/}
            <div style={styles.navbar}>
            <h2>Devlog V2 Dashboard</h2>

            <button 
            style={styles.logout}
            onClick={()=>{
                localStorage.removeItem("token");
                window.location.href="/login";
            }}
            >Logout</button>
           </div>

           { /*main*/}
            <div style={styles.container}>
            <h1>Welcome back!</h1>
            <p>Build. Share. Improve</p>

            <div style={styles.card}>
                <Link to="/create-post" style={styles.linkBtn}>Create Post</Link>
            </div>

            <div style={styles.card}>
                <button style={styles.btn}>My Posts</button>
            </div>

            <div style={styles.card}>
                <button style={styles.btn}>Profile</button>
            </div>
         </div>
     </div>
    );
}
const styles = { navbar:{
    display:"flex",
    justifyContent: "space-between",
    padding: "15px 25px",
    background: "#111",
    color:"white",
    alignItems: "center",
},
container:{
    padding:"30px",
    textAlign: "center",
},
card:{
    margin: "10px 15px",
    padding: "20px",
    width: "250",
    background: "#f5f5f5",
    borderRadius: "10px",
},
 btn: {
    padding: "10px 15px",
    cursor: "pointer",
  },
  linkBtn: {
    textDecoration: "none",
    padding: "10px 15px",
    display: "inline-block",
    background: "#007bff",
    color: "white",
    borderRadius: "6px",
  },
  logout:{
    padding:"8px 12px",
    background:"red",
    color:"white",
    border:"none",
    cursor:"pointer",
  },
  center:{
    textAlign:"center",
    marginTop:"100px",

  },
};

export default Dashboard;