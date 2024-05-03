import React, { useEffect, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { loginInitialValue, loginValidationSchema } from '../../form_validations';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
    const [click, setClick] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            navigate("/home");
            toast.info("logout first before new login")
        }
    }, [])


    return (

        <Formik initialValues={loginInitialValue} validationSchema={loginValidationSchema}

            onSubmit={async (values, { setSubmitting, resetForm }) => {
                setClick(!click)
                const credentials = {
                    email: values.email,
                    password: values.password
                }
                try {
                    const response = await axios.post("http://localhost:8000/api/v1/login", credentials,
                        {
                            headers: {
                                Accept: "application/json"
                            }
                        }
                    );

                    setClick(true);
                    if (response.data.status === "success") {
                        toast.success(response.data.message);
                        var token = response.data.data.token.token;
                        sessionStorage.setItem("token", token);
                        navigate("/home");
                        setClick(false);
                        setSubmitting(false);
                        resetForm();
                    }
                } catch (error) {
                    toast.error(error.response.data.message);
                    setClick(false);
                    setSubmitting(false);
                }
            }}
        >

            <Form className="space-y-4 md:space-y-6" action="#">
                <div className='h-[90px]'>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <Field type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ritesh@123gmail.com" required="" />
                    <p className='text-red-500 absolute text-sm my-2'><ErrorMessage name="email" /></p>
                </div>
                <div className='h-[90px]'>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <Field type="password" name="password" id="password" placeholder="********" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    <p className='text-red-500 absolute text-sm my-2'><ErrorMessage name="password" className='text-red-500' /></p>
                </div>
                {click ? (<button disabled type="button" className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                    </svg>
                    Loading...
                </button>)
                    :
                    (<button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Sign In</button>)
                }

            </Form>

        </Formik >
    )
}

export default Login