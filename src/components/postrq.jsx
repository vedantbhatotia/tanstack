import axios from "axios";
import { useQuery,useMutation} from "@tanstack/react-query"
import { Link } from "react-router-dom";
import {useState} from 'react'
import { useQueryClient } from "@tanstack/react-query";
function Postrq() {
    const [title,setTitle] = useState();
    const queryClient = useQueryClient();
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
        onSuccess:(newData)=>{
            // query cache list present containing posts the new post is just addedd to the list saving one get request
            queryClient.setQueryData(['posts'],(oldData)=>{
                return {
                    ...oldData,
                    data:[...oldData.data,newData.data]
                }
            })
        },
        onError:(error)=>{
            console.log(error);
        }
    })  
    const {data,isError,isLoading,error,refetch} = useQuery({
         queryKey: ['posts'],
         queryFn:async()=>{
            const response = await axios.get('http://localhost:4000/posts');
            return response
        },
        enabled:true,
        refetchIntervalInBackground: true,
    }) 
    if(isLoading){
        return <div>Loading...</div>
    }
    if(isError){
        return <div>Error: {error.message}</div>
    }
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