import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { Container, PostCard } from '../components'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((response) => {
            if (response && response.documents) {
                setPosts(response.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="w-full  mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className=" w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500 h-[60vh] p-30">
                                Write, share, and explore stories from creators like you.
                                Start your blogging journey today.
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
