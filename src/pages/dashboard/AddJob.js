import { FormRow, FormRowSelect } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { handleChange, clearValues, createJob } from '../../features/job/jobSlice';
import { useEffect } from 'react';

/**Jobster app - version 6 - AddJob Page - Features:
 * 
 *    --> Building 'AddJob' Page
 * 
 *    --> Importing all the 'AddJob' related props 
 *        from the store. 
 * 
 *    --> Building 'handleSubmit' and 'handleJobInput' 
 * 
 *    --> Building the input returns on 'FormRow'.
 * 
 *    --> Building buttons an setting actions
 * 
 *    --> Building the input that returns on 
 *       'FormRowSelect'   
 * 
 *    --> Importing and dispatching 'handleChange'  
 *        to target user input. 
 * 
 *    --> Implementing 'clearValues' in order to clear
 *        the text.
 * 
 * Note: By this version is already test that initial
 * functionality works and styles set, for next versions
 * will be set the complete functionality.
 */

const AddJob = () => {
    
    const { isLoading,
             position,
             company,
             jobLocation,
             jobType,
             jobTypeOptions,
             status, 
             statusOptions,
             isEditing,
             editJobId   
            } = useSelector((store) => store.job)
            
    const { user } = useSelector((store) => store.user)

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!position || !company || !jobLocation ){
            toast.error('Please fill out all fields')
            return;
        }
        /**here i dispacth 'createJob' onSubmbit */
        dispatch(createJob({ position, company, jobLocation, jobType, status }));
    }

    const handleJobInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(handleChange({ name, value }))
        console.log(name, value)
    }

    useEffect(() => {
        dispatch(handleChange({
            name:'jobLocation',
             value:user.location
        })
      );
    },[])

    return(
        <Wrapper>
            <form className='form'>
                <h3>{ isEditing ? 'edit job' : 'add job'}</h3>
                <div className='form-center'>
                {/**position */}
                <FormRow 
                    type='text' 
                    name='position' 
                    value={position} 
                    handleChange={handleJobInput}/>
                {/**company */}
                <FormRow 
                    type='text' 
                    name='company' 
                    value={company} 
                    handleChange={handleJobInput}/>
                {/**jobLocation */}
                <FormRow 
                    type='text' 
                    name='jobLocation'
                    labelText='job location' 
                    value={jobLocation} 
                    handleChange={handleJobInput}/>
                {/**status select */}
                <FormRowSelect 
                name='status'
                value={status}
                handleChange={handleJobInput}
                list={statusOptions}
                />
                {/**JobType select */}
                <FormRowSelect 
                name='JobType'
                labelText='Job type'
                value={jobType}
                handleChange={handleJobInput}
                list={jobTypeOptions}
                />
             <div className='btn-container'>
                <button type='button' className='btn btn-block clear-btn' onClick={() => dispatch(clearValues())}>
                    clear
                </button>
                <button type='submit' className='btn btn-block submit-btn' onClick={handleSubmit} disabled={isLoading}>
                    submit
                </button>
            </div>
        </div>
    </form>
        </Wrapper>
    )
}

export default AddJob;