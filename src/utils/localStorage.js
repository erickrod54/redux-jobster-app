/**Jobster app - version 5 - localStorage js - Features:
 * 
 *    --> Building actions to 'addUser', 'removeUser'
 *        and 'getUserFrom' LocalStorage
 * 
 * Note: this is made in order to implement the navigation
 * programmaticlly from the 'register' to the 'dashboard'
 * -this actions will be invoked and implemented on 
 * 'register'-
 */

export const addUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}

export const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user')
}

export const getUserFromLocalStorage = () => {
    const result = localStorage.getItem('user')
    const user = result ? JSON.parse(result) : null;
    return user;
}