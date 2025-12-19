import React from 'react';
import xIcon from "../assets/socials/x.jpeg"
import instagramIcon from "../assets/socials/instagram.svg"
import linkedinIcon from "../assets/socials/linkedin.svg"

export default function SocialLinks(){

    const socialRedirecting = [
         {
      socialName: "X",
      socialIcon: xIcon,
      socialLink: "https://x.com/"
    },
    {
      socialName: "LinkedIn",
      socialIcon: linkedinIcon,
      socialLink: "https://linkedin.com/"
    },
    {
      socialName: "Instagram",
      socialIcon: instagramIcon,
      socialLink: "https://instagram.com/"
    }
  ];
    
    
return(
<div className='flex items-center justify-center gap-2 rounded-full py-2 border-blue-400'>
{socialRedirecting.map((e) => (
    <img 
    key = {e.socialName}
    src ={e.socialIcon}
    alt = {e.socialName}
    className='h-7 p-0.5 w-10 object-contain block cursor-pointer hover:opacity-75 transition'
    onClick = {() => window.open(e.socialLink, "_blank") }
    
/>
))}
</div>
);
}
