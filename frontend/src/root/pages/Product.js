import { ErrorMessage, Field, Form, Formik } from 'formik'
import { FilePicker } from 'evergreen-ui'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchSupplier } from '../../redux/features/slices/SliceOne';
import { useNavigate } from 'react-router-dom';
import { productInitialValue, productValidationSchema } from '../../form_validations';
import axios from 'axios';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';

const Product = () => {
  const [MRP, setMRP] = useState('')
  const [discount, setDiscount] = useState('')
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(true);
  const dispatch = useDispatch();
  const category = useSelector(state => state.data.productCategoriesList);
  const supplier = useSelector(state => state.data.supplierList.data);
  const handleToggle = () => {
    setIsChecked(!isChecked); // Toggle the checked state

  };
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSupplier());
  }, [])
  const handleMRP = (event) => {
    let input = event.target.value;
    // Limit the input to 10 digits
    input = input.slice(0, 6);

    // Filter out non-numeric characters
    const numericInput = input.replace(/\D/g, '');
    setMRP(numericInput);
  };
  const handleDiscount = (event) => {
    let input = event.target.value;
    input = input.slice(0, 2);
    // Filter out non-numeric characters
    const numericInput = input.replace(/\D/g, '');
    setDiscount(numericInput);
  };
  return (

    <Formik
      initialValues={productInitialValue}
      validationSchema={productValidationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        values.status = isChecked;
        try {
          const response = await axios.post("http://localhost:8000/api/v1/add_product", values,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
              }
            }
          );
          // setClick(true);
          if (response.data.status === "success") {
            toast.success(response.data.message);
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
      {({ values, setFieldValue }) => (
        <Form className='w-full max-w-3xl pt-5' encType='multipart/form-data'>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="name">Product Name <span className='text-red-500'>*</span></label>
              <Field className="mt-1 p-2 block w-full border rounded-md" name="name" />
              <ErrorMessage className='text-red-500 text-xs italic mt-1' name="name" component="div" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="image">image <span className='text-red-500'>*</span></label>
              <FilePicker
                value={values.image}
                onChange={value => {
                  setFieldValue('image', value)
                }}
                height={45}
                placeholder="Select your file"
              />
              <ErrorMessage className='text-red-500 text-xs italic mt-1' name="image" component="div" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="address_line_2">Product Category <span className='text-red-500'>*</span></label>
              <Field className="mt-1 p-2 block w-full border rounded-md" as="select" name="product_category">
                <option value="">Select Product Category</option>
                {
                  category && category.map(
                    (category, index) => {
                      return (<option key={index} value={category.id}>{category.category_name}</option>);
                    }
                  )
                }
              </Field>
              <ErrorMessage className='text-red-500 text-xs italic mt-1' name="product_category" component="div" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="address_line_2">Supplier <span className='text-red-500'>*</span></label>
              <Field className="mt-1 p-2 block w-full border rounded-md" as="select" name="supplier_id">
                <option value="">Select Supplier</option>
                {
                  supplier && supplier.map(
                    (supplier, index) => {
                      return (
                        <option key={index} value={supplier.id}>{supplier.name}</option>
                      );
                    }
                  )
                }
              </Field>
              <ErrorMessage className='text-red-500 text-xs italic mt-1' name="supplier_id" component="div" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="state">MRP ($)</label>
              <Field className="mt-1 p-2 block w-full border rounded-md" type="text" name="mrp" value={MRP} onInput={handleMRP} />
              <ErrorMessage className='text-red-500 text-xs italic mt-1' name="mrp" component="div" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="city">Discount ($)</label>
              <Field className="mt-1 p-2 block w-full border rounded-md" type="text" name="discount" value={discount} onInput={handleDiscount} />
              <ErrorMessage className='text-red-500 text-xs italic mt-1' name="discount" component="div" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">Description <span className='text-red-500'>*</span></label>
            <JoditEditor
              className="mt-1 p-2 block w-full border rounded-md"
              name="description"
              value={values.description} // Set value from Formik
              onChange={value => {
                setFieldValue('description', value)
              }}
            />
            <ErrorMessage className='text-red-500 text-xs italic mt-1' name="description" component="div" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-6" htmlFor="status">Status</label>
            <div className="flex flex-wrap">
              <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                <input id="switch-component" type="checkbox" name="status" checked={isChecked} onChange={handleToggle} className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-gray-900 peer-checked:border-gray-900 peer-checked:before:bg-gray-900" />
                <label htmlFor="switch-component"
                  className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-gray-900 peer-checked:before:bg-gray-900">
                  <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                    data-ripple-dark="true"></div>
                </label>
              </div>
            </div>
          </div>
          <div className='w-full flex justify-end py-5'>
            <button type="button" onClick={() => navigate("/home")} className="text-gray-500  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Cancel</button>
            {click ? (<button disabled type="button" className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
              <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
              </svg>
              Loading...
            </button>)
              :
              (<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>)
            }
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default Product