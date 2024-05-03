import axios from 'axios';
import React from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LogoutLink, SidebarLinks } from '../constants/sideBarLinks';

const SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Use useLocation hook to get current location
    const pathname = location.pathname; // Get the pathname from location
    const handleLogout = async (event) => {
        event.preventDefault();
        const response = await axios.post("http://localhost:8000/api/v1/logout", {}, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        })
        if (response.data.status === "success") {
            toast.success(response.data.message)
            sessionStorage.removeItem("token");
            navigate("/");
        }
    }
    return (
        <>

            <nav className='w-[30%]'>
                <div className='flex flex-col gap-11'>
                    <Link to={'/home'} className='flex items-center justify-center'>
                        <img
                            src="https://images.unsplash.com/photo-1516072900265-351afd3a57f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDN8Ym84alFLVGFFMFl8fGVufDB8fHx8fA%3D%3D"
                            alt="logo"
                            height={50}
                            width={50}
                            className='rounded-[50%]'
                        />
                    </Link>
                    <ul className='gap-6'>
                        {SidebarLinks.map((link, index) => {
                            const isActive = pathname === link.route;
                            return (
                                <li className={`leftsidebar-link rounded-lg w-64 my-0 mx-auto ${isActive && 'bg-blue-500 text-white'}`} key={index}>
                                    <NavLink
                                        to={link.route}
                                        className='flex justify-start gap-4 p-4 pl-10 mx-auto my-0'
                                    >
                                        {/* <img src={link.imgURL} alt={link.label} className='group-hover:invert-white' /> */}
                                        {link.label}
                                    </NavLink>
                                    
                                </li>
                            );
                        })}
                        {LogoutLink.map((link , index) => {
                            return (
                                <li key={index}>
                                    <NavLink
                                        className="flex justify-center my-20"
                                        onClick={handleLogout}>
                                        {/* <img src={link.imgURL} alt={link.label}
                                            className='group-hover:invert-white' /> */}
                                        {link.label}
                                    </NavLink>
                                </li>
                            );
                        })}
                        
                    </ul>
                </div>
            </nav>








        </>
    )
}

export default SideBar