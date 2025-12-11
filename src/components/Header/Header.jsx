import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navItems = [
        { name: "Home", slug: "/", active: true },
        { name: "All Posts", slug: "/all-posts", active: authStatus },
        { name: "Add Post", slug: "/add-post", active: authStatus },
        { name: "Login", slug: "/login", active: !authStatus },
        { name: "Signup", slug: "/signup", active: !authStatus },
    ];

    return (
        <header
            className="
            sticky top-3 z-50
            w-[70vw] mx-auto rounded-3xl 
            bg-white/10 backdrop-blur-xl
            border border-white/20
            shadow-lg shadow-black/20
            transition
            "
        >
            <Container>
                <nav className="flex items-center py-3 px-4 justify-between">

                    {/* LOGO */}
                    <Link to="/" className="flex items-center gap-2 cursor-pointer">
                        <Logo />
                        <span className="text-lg font-semibold tracking-wide">Write[ Square ]</span>
                    </Link>

                    {/* NAV ITEMS */}
                    <ul className="flex items-center gap-3">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className="
                                        px-4 py-2 rounded-full text-sm font-medium 
                                        text-gray-200
                                        hover:bg-white/20 hover:text-white
                                        active:scale-95 
                                        transition
                                        "
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}

                        {/* LOGOUT BUTTON */}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>

                </nav>
            </Container>
        </header>
    );
}
