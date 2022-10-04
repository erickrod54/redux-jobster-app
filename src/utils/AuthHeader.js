/**Jobster app - version 9 - authHeader - Features:
 * 
 *    --> Building 'authHeader' util
 *   
 * Note: 'authHeader' util will be use to simplify the 
 * implementation of headers in the code.
 */

const authHeader = (thunkAPI) => {
    return {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    };
  };

  export default authHeader;