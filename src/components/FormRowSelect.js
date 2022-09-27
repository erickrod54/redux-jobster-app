import React from "react";

/**Jobster app - version 6 - FormSelect - Features:
 * 
 *    --> Building 'FormSelect' Component
 * 
 * Note: this porpuse of this component is to give
 * styles and functionality to multiple multiple 
 * select inputs on 'AddJob'
 */

const FormRowSelect = ({ labelText, name, value, handleChange, list }) => {

    return(
        <div className='form-row'>
                    <label htmlFor={name} className='form-label'>
                        {labelText || name}
                    </label>
                    <select 
                        name={name} 
                        id={name} 
                        value={value} 
                        onChange={handleChange} 
                        className='form-select'>

                       {list.map((itemValue, index) => {
                            return( 
                                
                            <option 
                                key={index} 
                                value={itemValue}>{itemValue}</option>
                                )
                       })}
                    </select>
                </div>
    )
}

export default FormRowSelect;