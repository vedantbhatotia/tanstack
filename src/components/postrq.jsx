import axios from "axios";
import { useQuery,useMutation} from "@tanstack/react-query"
import { Link } from "react-router-dom";
import {useState} from 'react'
function Postrq() {
    const [title,setTitle] = useState();
    const [body,setBody] = useState();
    function handleSubmit(e){
        e.preventDefault();
        mutate({title,body});
    }
    const {mutate} = useMutation({
        mutationFn:async({title,body})=>{
            const response = await axios.post('http://localhost:4000/posts',{
                title,
                body
            })
            return response
        },
        onSuccess:()=>{
            console.log("post created successfully");
        },
        onError:()=>{
            console.log("post creation failed");
        }
    })  
    const {data,isError,isLoading,error,refetch} = useQuery({
         queryKey: ['posts'],
         queryFn:async()=>{
            const response = await axios.get('http://localhost:4000/posts');
            return response
        },
        enabled:false,
        refetchIntervalInBackground: true,
    }) 
    if(isLoading){
        return <div>Loading...</div>
    }
    if(isError){
        return <div>Error: {error.message}</div>
    }
    // console.log(data) 
    return (
        <>
         <button onClick={refetch}>Fetch Data</button>
        <div className="post-list">
            <form>
                <input onChange={(e)=>{setTitle(e.target.value)}} placeholder="enter post title" value={title}></input>
                {/* <input></input> */}
                <input onChange={(e)=>{setBody(e.target.value)}} placeholder="enter post body" value={body}></input>
                <button onClick={handleSubmit}>Post</button>
            </form>
        {data?.data.map(post => (
            <Link to={`/rq-posts/${post.id}`} key={post.id} className="post-item">
            <div onClick={() => handleClick(post.id)} key={post.id} className="post-item">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-body">{post.body}</p>
            </div>
            </Link>
        ))}
    </div>
        </>
  )
}
export default Postrq