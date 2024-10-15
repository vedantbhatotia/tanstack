import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
function PaginatedQueries(){
    const {data,isLoading,isError,error} = useQuery({
        queryKey:["fruits"],
        queryFn:async()=>{
            const res = await axios.get("https://localhost:4000/fruits");
            return res
        }
    })
    if (isLoading) {
        return <h2>Page is Loading...</h2>
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

    return (
        <div>
            {data?.data.map((fruit)=>{
                return <div key={fruit.id}>
                    <h2>{fruit.name}</h2>
                </div>
            })}
        </div>
    )
}
export default PaginatedQueries