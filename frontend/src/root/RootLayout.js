import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import { toast } from 'react-toastify';

const RootLayout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            navigate("/");
            toast.error("you are not authorised to access this page")
        }
    }, [])
    return (
        <>
            <div className="text-black flex w-[100%]">
                <div className='w-[30%]'>
                    <SideBar />
                </div>
                <main className='w-[70%]'>
                    <Header />
                    <div className='flex justify-center items-center shadow-2xl rounded-2xl'>
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    )
}

export default RootLayout