import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories, fetchProducts, fetchStaff, fetchSupplier } from '../../redux/features/slices/SliceOne';
const Home = () => {
  const dispatch = useDispatch();
  const productCategory = useSelector(state => state.data.productCategoriesList);
  const staff = useSelector(state => state.data.staffList.data);
  const products = useSelector(state => state.data.productList.data);
  const supplier = useSelector(state => state.data.supplierList.data);
  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchStaff())
    dispatch(fetchProducts())
    dispatch(fetchSupplier())
  }, [])

  return (
    <>
      <div className='h-[90vh] w-full flex flex-col items-center overflow-y-scroll'>
        <div className='my-5 py-5 h-[70%] border-2 w-[80%] flex flex-col items-center shadow-2xl rounded-3xl'>
          <h1 className='shadow-2xl mb-5'>Product Categories</h1>
          <div className='overflow-y-scroll'>
            <div className="absolut overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      S. No.
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Description
                    </th>
                    {/* <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th> */}
                  </tr>
                </thead>
                <tbody>
                  {productCategory && productCategory.map(
                    (category, index) => {
                      return (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="px-6 py-4 text-center">{index + 1}</td>
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{category.category_name}</th>
                          <td className="px-6 py-4 break-all w-[400px]">{category.helper_text}</td>
                          {/* <td className="px-6 py-4 text-right">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                      </td> */}
                        </tr>
                      );
                    }
                  )}

                </tbody>
              </table>
            </div>

          </div>
        </div>

        <div className='my-5 py-5 h-[70%] border-2 w-[80%] flex flex-col items-center shadow-2xl rounded-3xl'>
          <h1 className='shadow-2xl mb-5'>Supplier</h1>
          <div className='overflow-scroll w-[90%]'>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      S. No.
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Address
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Country
                    </th>
                    <th scope="col" className="px-6 py-3">
                      State
                    </th>
                    <th scope="col" className="px-6 py-3">
                      City
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Zip Code
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Phone Number
                    </th>
                    {/* <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th> */}
                  </tr>
                </thead>
                <tbody>
                  {supplier && supplier.map(
                    (supplier, index) => {
                      return (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="px-6 py-4 text-center">{index + 1}</td>
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{supplier.name}</th>
                          <td className="px-6 py-4 ">{supplier.email}</td>
                          <td className="px-6 py-4 ">{supplier.address_line_1} {supplier.address_line_2}</td>
                          <td className="px-6 py-4 ">{supplier.country}</td>
                          <td className="px-6 py-4 ">{supplier.state}</td>
                          <td className="px-6 py-4 ">{supplier.city}</td>
                          <td className="px-6 py-4 ">{supplier.zip_code}</td>
                          <td className="px-6 py-4 ">{supplier.phone}</td>
                          {/* <td className="px-6 py-4 text-right">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                      </td> */}
                        </tr>
                      );
                    }
                  )}

                </tbody>
              </table>

          </div>
        </div>

        <div className='my-5 py-5 h-[70%] border-2 w-[80%] flex flex-col items-center shadow-2xl rounded-3xl'>
          <h1 className='shadow-2xl mb-5'>Products</h1>
          <div className='overflow-scroll w-[90%]'>
            {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg"> */}
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      S. No.
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Supplier
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      MRP
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Discount
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Description
                    </th>
                    {/* <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th> */}
                  </tr>
                </thead>
                <tbody>
                  {products && products.map(
                    (product, index) => {
                      return (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="px-6 py-4 text-center">{index + 1}</td>
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{product.name}</th>
                          <td className="px-6 py-4 "><img src = {`http://localhost:8000/products_images/${product.image}`} className='w-5 h-5 rounded-full cursor-pointer' /></td>
                          <td className="px-6 py-4 ">{product.supplier.name}</td>
                          <td className="px-6 py-4 ">{product.product_category.category_name}</td>
                          <td className="px-6 py-4 ">{product.mrp}</td>
                          <td className="px-6 py-4 ">{product.discount}</td>
                          <td className="px-6 py-4 ">{product.description}</td>
                          {/* <td className="px-6 py-4 text-right">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                      </td> */}
                        </tr>
                      );
                    }
                  )}

                </tbody>
              </table>
            {/* </div> */}

          </div>
        </div>

        <div className='my-5 py-5 h-[70%] border-2 w-[80%] flex flex-col items-center shadow-2xl rounded-3xl'>
          <h1 className='shadow-2xl mb-5'>Staff</h1>
          <div className='overflow-scroll w-[90%]'>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                  <tr>
                    <th scope="col" className="pl-5 py-3">
                      S. No.
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Address
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Country
                    </th>
                    <th scope="col" className="px-6 py-3">
                      State
                    </th>
                    <th scope="col" className="px-6 py-3">
                      City
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Zip Code
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Phone Number
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Parent
                    </th>
                    {/* <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th> */}
                  </tr>
                </thead>
                <tbody>
                  {staff && staff.map(
                    (staff, index) => {
                      return (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="px-6 py-4 text-center">{index + 1}</td>
                          <td className="py-4">{staff.first_name} {staff.last_name}</td>
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{staff.email}</th>
                          <td className="px-6 py-4 ">{ staff.address_line_1} {staff.address_line_2}</td>
                          <td className="px-6 py-4 ">{staff.country}</td>
                          <td className="px-6 py-4 ">{staff.state}</td>
                          <td className="px-6 py-4 ">{staff.city}</td>
                          <td className="px-6 py-4 ">{staff.zip_code}</td>
                          <td className="px-6 py-4 ">{staff.phone}</td>
                          <td className="px-6 py-4 ">{staff.parent }</td>
                          {/* <td className="px-6 py-4 text-right">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                      </td> */}
                        </tr>
                      );
                    }
                  )}

                </tbody>
              </table>

          </div>
        </div>


      </div>

    </>
  )
}

export default Home