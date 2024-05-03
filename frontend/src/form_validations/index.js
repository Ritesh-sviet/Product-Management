import * as Yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const loginInitialValue = {
    email: "",
    password: "",
};

export const loginValidationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required !'),
    password: Yup.string().min(6, "minimum six character required !").required("Required !")
})

export const staffInitialValue = {
    first_name: "",
    last_name: "",
    address_line_1: "",
    address_line_2: "",
    country: "",
    state: "",
    city: "",
    zip_code: "",
    phone: "",
    email: "",
    password: "",
    parent: "0",
    status: "",
};

export const staffValidationSchema = Yup.object({
    first_name: Yup.string().min(2, "insert atleast two character").required("first name is required"),
    last_name: Yup.string().min(2, "insert atleast two character").required("last name is required"),
    address_line_1: Yup.string().required("Address is requires"),
    address_line_2: Yup.string(),
    country: Yup.string().required("country is reuired"),
    state: Yup.string().required("state is required"),
    city: Yup.string().required("city is required"),
    zip_code: Yup.number().min(2, "insert atleast two character").required("zip code is required"),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(2, "insert atleast two character").required(),
    email: Yup.string().email().min(2, "insert atleast two character").required(),
    password: Yup.string().matches(/(?=.*[a-zA-Z])(?=.*\d)/, 'Password must contain both letters and numbers').min(6, "password must be of atlease 6 character").required(),
    parent: Yup.string().required(),
})
export const productCategoryInitialValue = {
    name: "",
    description: "",
    status: ""
};

export const productCategoryValidationSchema = Yup.object({
    name: Yup.string().min(3, "atleast three character required").required("category name is required"),
    description: Yup.string().min(3, "atleast three character required").required("category description is required"),
})

export const productInitialValue = {
    name: "",
    image: "",
    product_category: "",
    supplier_id: "",
    description: "",
    mrp: "",
    discount: "",
    status: "",
};

export const productValidationSchema = Yup.object({
    name: Yup.string().min(3, "At least three characters required").required("Product name is required"),
    description: Yup.string().min(3, "At least three characters required").required("Product description is required"),
    image: Yup.mixed().required("Image is required"),
    product_category: Yup.string().required("Product category is required"),
    supplier_id: Yup.string().required("Supplier is required"),
})

export const supplierInitialValue = {
    supplier_name: '',
    address_line_1: '',
    address_line_2: '',
    country: '',
    state: '',
    city: '',
    zip_code: '',
    phone: '',
    email: '',
    status: ''
};

export const supplierValidationSchema = Yup.object({
    supplier_name: Yup.string().required('supplier name is required'),
    phone: Yup.string().required('Phone number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
})





