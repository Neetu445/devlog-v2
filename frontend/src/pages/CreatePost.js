import{ useState } from "react";
import axios from "axios";

function CreatePost(){

    const[title, setTitle] = useState("");
    const[whatIDid, setWhatIDid] = useState("");
    const[learned, setLearned] = useState("");
    const[problems, setProblems] = useState("");
    const[solutions, setSolutions] = useState("");
    const[screenshot, setScreenshot] = useState("");
    const[video, setVideo] = useState("");
    const[tags, setTags] = useState("");

       const token = localStorage.getItem("token");

    if(!token){
        return <h2>Please login first</h2>;
    }
    

    const handlePost =async() => {
        try{
            const token = localStorage.getItem("token");
            if (
  !title ||
  !whatIDid ||
  !learned ||
  !problems ||
  !solutions
) {
  alert("Please fill all required fields");
  return;
}

            const res = await axios.post(
                "http://localhost:5000/posts",{title,
                    whatIDid:[whatIDid],
                    learned:[learned],
                    problems:[problems],
                    solutions:[solutions],
                    screenshot,video,
                    tags, 
                },
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    },
                }
            );

            console.log(res.data);
            alert("Post created successfully");
            setTitle("");
            setWhatIDid("");
            setLearned("");
            setProblems("");
            setSolutions("");
            setScreenshot("");
            setVideo("");
            setTags("");
        }  catch(err){
            console.log(err);
            alert("Error creating post");
        }
    };

    return(
        <div style={{padding:"20px"}}>
            <h2>Create Learning Log</h2>

            <input
            type="text"
            placeholder ="Title"
            value={title}
            onChange ={(e) => setTitle(e.target.value)}
            />
            <br /><br />
            
            <textarea
            placeholder ="What did you do today?"
            value={whatIDid}
            onChange={(e)=>setWhatIDid(e.target.value)}/>

            <br /><br />


           <textarea
           placeholder="What did you learn?"
           value={learned}
           onChange={(e) => setLearned(e.target.value)}/>
                  
            <br /> <br />

            <textarea
            placeholder ="Problem faced?"
            value={problems}
            onChange={(e)=>setProblems(e.target.value)}/>

            <br /><br />
            <textarea
            placeholder ="How did you solve them?"
            value={solutions}
            onChange={(e)=>setSolutions(e.target.value)}/>

            <br /><br />
            <input
            type="text"
            placeholder ="Screenshot URL(optional)"
            value={screenshot}
            onChange={(e)=>setScreenshot(e.target.value)}/>

            <br /><br />
            <input
            type="text"
            placeholder ="Video URL(optional)"
            value={video}
            onChange={(e)=>setVideo(e.target.value)}/>

            <br /><br />
            <input
            type="text"
            placeholder ="Tags(React, JavaScript, MERN...)"
            value={tags}
            onChange={(e)=>setTags(e.target.value)}/>

            <br /><br />

            <button onClick={handlePost}>
                Create Learning log
            </button>

        </div>
    );

}

export default  CreatePost;