import{useEffect, useState} from "react";
import axios from "axios";

function journey(){
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        const fetchPosts = async ()=>{
            try{
                const token = localStorage.getItem("token");

                const res = await axios.get("http://localhost:5000/my-posts",{
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                });

                setPosts(res.data);
            }catch(err){
                console.log(err)
            }
        };

        fetchPosts();
    }, []);

    return(
        <div style={{padding:20px}}>
            <h2></h2>
        </div>

    )
}