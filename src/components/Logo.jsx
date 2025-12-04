import react from 'react'

function Logo() {
  return (
   <div className="flex items-center p-1 rounded-md 
                transition-all duration-300 
                hover:bg-white/10">
  <img 
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbE38zWf25a7rFgXQywVswOhpH6Lireo59NL1NJE-ubQdf9jz-FH2wtE4qDrVaRneGCXg&usqp=CAU"
    className="h-10 w-auto object-contain rounded-2xl"
    alt="logo"
  />
</div>

  );
}



export default Logo 