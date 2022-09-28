import { useState } from 'react';
import { FormRow } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUser } from '../../features/user/userSlice';


/**Jobster app - version 6 - Profile js - Features:
 * 
 *    --> Building Profile Page.
 * 
 *    --> Destructuring 'isloading' and 'user' from the store.
 * 
 *    --> Building 'handleSubmit' and 'handleChange'.
 * 
 *    --> Building the return with the 'FormRow'.  
 * 
 * Note: By this version the functionality has been set
 * 
 */

const Profile = () => {

    const { isLoading, user } = useSelector((store) => store.user)
    const dispatch = useDispatch();
    const [ userData, setUserData ] = useState({
        name:user?.name || '',
        email:user?.email || '',
        lastName:user?.lastName || '',
        location:user?.location || '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const { name, email, lastName, location } = userData;

        if (!name || !email || !lastName || !location ) {
            toast.error('please fill out all fields')
            return
        }
        dispatch(updateUser(userData))
    }

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        setUserData({...userData, [name]:value})
    }

    return(
        <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>profile</h3>

        <div className='form-center'>
          <FormRow
            type='text'
            name='name'
            value={userData.name}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            labelText='last name'
            name='lastName'
            value={userData.lastName}
            handleChange={handleChange}
          />
          <FormRow
            type='email'
            name='email'
            value={userData.email}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='location'
            value={userData.location}
            handleChange={handleChange}
          />
          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
    )
}

export default Profile;