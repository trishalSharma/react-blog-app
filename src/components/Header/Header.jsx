import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: authStatus, 
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus, 
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus, 
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus, 
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus, 
        },
    ]

    return (
    <header className='py-3 w-[50vw] mx-auto rounded-3xl shadow bg-slate-800'>
        <Container>
            <nav className='flex'>
                <div className='mr-4'>
                    <Link to='/'>
                        <Logo />
                    </Link>
                </div>

                    <ul className='flex ml-auto'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                     <button onClick={() => navigate(item.slug)}
                                      className='inline-block px-6 py-2 duration-200 hover:cursor-pointer active:opacity-50 hover:bg-slate-200 hover:text-black rounded-full'
                            >
                                {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}


