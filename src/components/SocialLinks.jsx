import React from 'react';

export default function SocialLinks(){

    const socialRedirecting = [
         {
      socialName: "X",
      socialIcon: "/images/socials/x.svg",
      socialLink: "https://x.com/"
    },
    {
      socialName: "LinkedIn",
      socialIcon: "/images/socials/linkedin.svg",
      socialLink: "https://linkedin.com/in/"
    },
    {
      socialName: "Instagram",
      socialIcon: "/images/socials/instagram.svg",
      socialLink: "https://instagram.com/"
    }
  ];
    
    
return(
<div className='flex items-center justify-center gap-4 bg-[#1e293b] rounded-full py-2 border-blue-400'>
{socialRedirecting.map((e) => (
    <img 
    key = {e.socialName}
    src ={e.socialIcon}
    alt = {e.socialName}
    className='h-6 p-0.5 w-10 object-contain block cursor-pointer hover:opacity-75 transition'
    onClick = {() => window.open(e.socialLink, "_blank") }
    
/>
))}
</div>
);
}
