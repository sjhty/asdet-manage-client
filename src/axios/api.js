import axios from './axios'

//users
const addUser = ( user ) => axios( '/api/users/add', user, 'POST'); 

//category
const addCategory = ( category ) => axios( '/api/category/add', category, 'POST');

const asdetApi = {
    addUser,
    addCategory
}

export default asdetApi