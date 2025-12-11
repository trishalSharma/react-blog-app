import React from "react";

export default function LoggedOutView(){

    return(
        <>
        <div className="min-h-screen w-full bg-[#071a1e] text-white">

      
      <section className="flex flex-col items-center text-center pt-32 pb-20 px-6">
        <h1
          className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl
                     bg-linear-to-b from-white to-gray-400 bg-clip-text text-transparent">
          Write, share, and explore stories from creators like you.
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl">
          Start your blogging journey today with a modern, distraction-free platform
          designed for creators.
        </p>

        <div className="mt-8 flex gap-4">
          <a
            href="/signup"
            className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 
                       text-lg transition shadow-lg">
            Get Started
          </a>

          <a
            href="/all-posts"
            className="px-7 py-3 rounded-xl bg-white/10 border border-white/20 
                       hover:bg-white/20 text-lg transition"
          >
            Explore Posts
          </a>
        </div>
      </section>
      </div>
</>
    )

}