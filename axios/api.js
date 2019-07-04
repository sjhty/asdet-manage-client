import axios from './axios'

//users
export const addUser = ( user ) => axios.request( '/api/users/add', user, 'POST'); 

//category
export const addCategory = ( category ) => axios.request( '/api/category/add', category, 'POST');