import axios from "axios";
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom";
function Postrq() {
    const {data,isError,isLoading,error,refetch} = useQuery({
         queryKey: ['posts'],
         queryFn:async()=>{
            const response = await axios.get('http://localhost:4000/posts');
            return response
        },
        enabled:false,
        // refetchInterval: 1000
        refetchIntervalInBackground: true,
        // used when we want to update the data in the background while we are not on the same page/component
        // used for polling data in regular intervals eg in trading applications where we need to update the data in real time
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