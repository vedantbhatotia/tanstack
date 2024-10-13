import axios from "axios";
import { useQuery } from "@tanstack/react-query"
function Postrq() {
    const {data,isError,isLoading,error} = useQuery({
         queryKey: ['posts'],
         queryFn:async()=>{
            const response = await axios.get('http://localhost:4000/posts');
            return response
        }
    }) 
    if(isLoading){
        return <div>Loading...</div>
    }
    if(isError){
        return <div>Error: {error.message}</div>
    }
    // console.log(data) 
    return (
        <div className="post-list">
        {data?.data.map(post => (
            <div onClick={() => handleClick(post.id)} key={post.id} className="post-item">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-body">{post.body}</p>
            </div>
        ))}
    </div>
  )
}
export default Postrq