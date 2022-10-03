import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useSelector, useDispatch } from 'react-redux';
import { changePage } from '../features/allJobs/allJobsSlice';

/**Jobster app - version 9 - PageBtnContainer- Features:
 * 
 *    --> Building 'PageBtnContainer'. 
 * 
 *    --> Building the return with two 'buttons' and 
 *        mapping the' pages'.  
 * 
 *    --> Importing and setting 'changePage' action
 *        to change the page once click.
 * 
 * Note: for the pages i use Array from to trasnform
 * 'numOfPages' into and array and set 'index + 1' as
 * the pages number for the total pagination
 * 
 *      'pageNumber' will be the payload for
 *      'changePage'
 * 
 */

const PageBtnContainer = () => {
    const { numOfPages, page } = useSelector((store) => store.allJobs)
    const dispatch = useDispatch()

    /**here i use a 'Array' method to convert 'numOfPages' in an 
     * array*/
    const pages = Array.from({length: numOfPages }, (_, index) => {
        /**i use the 'index' to get pages number*/
        return index + 1
    })
    console.log(pages)

    /**here i build the feature to get to nextPage */
    const nextPage = () => {
        let newPage = page + 1;
        
        /**when the pages try to go further
         * the max of pages*/
        if (newPage > numOfPages) {
            newPage = 1
        }
        dispatch(changePage(newPage))
    }

    /**here i build the feature to get to previous page */
    const prevPage = () => {
        let newPage = page - 1;

        /**when newPage is trying to go bellow
         * the minor number of pages*/
        if (newPage < 1) {
            newPage = numOfPages;
        }
        dispatch(changePage(newPage))
    }

    return(
        <Wrapper>
            <button type='button' className='prev-btn' onClick={prevPage}>
                <HiChevronDoubleLeft />
                 prev
            </button>
            <div className='btn-container'>
            {pages.map((pageNumber) => {
               return(
               <button type='button'
                         key={pageNumber}
                         className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
                         onClick={() => dispatch(changePage(pageNumber))}>
                {pageNumber}
               </button>
               )
            })}
            </div>
            <button type='button' className='next-btn' onClick={nextPage}>
                 next
                <HiChevronDoubleRight />
            </button>
        </Wrapper>
    )
}

export default PageBtnContainer;