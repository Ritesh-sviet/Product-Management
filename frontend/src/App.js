import logo from './logo.svg';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AuthLayout from './auth/AuthLayout';
import { Route, Routes } from 'react-router-dom';
import Login from './auth/form/Login';
import Home from './root/pages/Home';
import RootLayout from './root/RootLayout';
import { Product, ProductManagement, Staff, Supplier } from './root/pages';
function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route index element={<Login />} />
        </Route>
        <Route element={<RootLayout />}>
          <Route path =  "/home" element={<Home />} />
          <Route path =  "/product_category" element={<ProductManagement />} />
          <Route path =  "/supplier" element={<Supplier />} />
          <Route path =  "/product" element={<Product />} />
          <Route path =  "/staff" element={<Staff />} />
        </Route>
        <Route path='*' element= {<div className='flex justify-center items-center h-screen'>404! Not found</div>} />
      </Routes>
    </>
  );
}

export default App;
