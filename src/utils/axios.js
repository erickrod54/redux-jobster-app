import axios from "axios";

/**Jobster app - version 4 - utils > axios js - Features:
 * 
 *    --> Building a 'customFetch' hook to have easier
 *      implementation of the url fetch. 
 * 
 * Note: These action will have implementation 'onSubmit'
 * 
 */

const customFetch = axios.create({
    baseURL:'https://jobify-prod.herokuapp.com/api/v1/toolkit'
})

export default customFetch;