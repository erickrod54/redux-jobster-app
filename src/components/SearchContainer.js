import { FormRow, FormRowSelect } from '.';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useSelector, useDispatch } from 'react-redux';
import { handleChange, clearFilters } from '../features/allJobs/allJobsSlice';

/**Jobster app - version 10 - SearchContainer js - Features:
 * 
 *    --> Fixing bug for 'handleSearch' that makes
 *        multiple request as the user types.   
 * 
 * Note:  Fixing 'handleSearch' (to troubleshoot and see this
 * error - Chrome > Network tab, and comment handleChange
 * 'if (isLoading) return;' )
 * 
 */

const SearchContainer = () => {

    /**here i destructure all 'search' props related from
     * the store > allJobs */
    const { isLoading,
          search,
          searchStatus,
          searchType,
          sort,
          sortOptions } = useSelector((store) => store.allJobs)

     /**here i destructure all the props related to the single 'job' */     
    const { jobTypeOptions, statusOptions } = useSelector((store) => store.job)

          const dispatch = useDispatch();

          /**here i dispatch 'handleChange' to control 
           * the inputs */
          const handleSearch = (e) => {
            /**this will fix multiple request while the
             * user is typing */
            if (isLoading) return;
            /**isLoading check later */
            dispatch(handleChange({ name: e.target.name, value: e.target.value }))
          };

          /**here i dispatch clearFilters */
          const handleSubmit = (e) => {
            e.preventDefault();
            dispatch(clearFilters())
          };
    return(
        <Wrapper>
            <form className='form'>
                <h4>search form</h4>
                <div className='form-center'>
                    {/**search position */}
                    <FormRow type='text'
                     name='search'
                     value={search}
                     handleChange={handleSearch} />

                     {/**search by status */}
                     <FormRowSelect 
                     labelText='status'
                     name='searchStatus'
                     value={searchStatus}
                     handleChange={handleSearch}
                     list={['all', ...statusOptions]}
                     />
                     
                      {/**search by jobType*/}
                      <FormRowSelect 
                     labelText='type'
                     name='searchType'
                     value={searchType}
                     handleChange={handleSearch}
                     list={['all', ...jobTypeOptions]}
                     />

                      {/**search by Sort*/}
                      <FormRowSelect 
            
                     name='sort'
                     value={sort}
                     handleChange={handleSearch}
                     list={sortOptions}
                     />

                     <button 
                        className='btn btn-block btn-danger' 
                        disabled={isLoading}
                        onClick={handleSubmit}
                        >
                        clear filters
                     </button>
                </div>
            </form>
        </Wrapper>
    )
}

export default SearchContainer;