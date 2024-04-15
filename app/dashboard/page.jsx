"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import Post from "@/components/Post";

export default function Home() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        (async () => {
            try {
                const {data} = await axios.get('./api/post')
                setPosts(data);
                setLoading(false)
            } catch (error) {
                setLoading(true)
            }
        })()
    }, [setLoading])

    return(
        <main className="flex w-full flex-grow">
        <div className="flex flex-col flex-1 gap-y-8 max-w-lg mx-auto pb-20">
            {loading && <p>Loading...</p>}
            <Post data={posts} />

        </div>
        </main> 
    )
}
