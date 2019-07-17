import axios from './axios'

//users
const addUser = ( user ) => axios( '/api/users/add', user, 'POST'); 

//category
const addCategory = ( category ) => axios( '/api/category/add', category, 'POST');
const findCategory = () => axios( '/api/category/find', 'POST');

//products
const addProduct = ( product) => axios( '/api/products/add', product, 'POST');
const findProduct = () => axios( '/api/products/find', 'POST');

const asdetApi = {
    addUser,
    addCategory,
    findCategory,
    addProduct,
    findProduct
}

export default asdetApi