import{ useState } from "react";
import axios from "axios";

function CreatePost(){

    const[title, setTitle] = useState("");
    const[content, setContent] = useState("");

       const token = localStorage.getItem("token");

    if(!token){
        return <h2>Please login first</h2>;
    }
    

    const handlePost =async() => {
        try{
            const token = localStorage.getItem("token");

            const res = await axios.post(
                "http://localhost:5000/posts",{title, content},
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(res.data);
            alert("Post created successfully");
        }catch(err){
            console.log(err);
            alert("Error creating post");
        }
    };

    return(
        <div style={{padding:"20px"}}>
            <h2>Create Post</h2>

            <input placeholder ="Title"
            onChange ={(e) => setTitle(e.target.value)}
            />
            <br /><br />
            
            <textarea
            placeholder ="Content"
            onChange={(e)=>setContent(e.target.value)}/>
            <br /><br />

            <button onClick={handlePost}>
                Create Post
            </button>

        </div>
    );

}

export default  CreatePost;