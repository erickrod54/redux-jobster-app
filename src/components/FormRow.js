import React from "react";

/**Jobster app - version 6 - 'FormRow' - Features:
 * 
 *    --> Building the form Row Component. 
 * 
 * Note: this porpuse of this component is to give
 * styles and functionality to multiple basic forms
 * on pages as 'AddJob' and 'Profile'  
 */

const FormRow = ({ type, name, value, handleChange, labelText }) => {

    return(
    <div className="form-row">
        <label htmlFor={name} className="form-label">
            {labelText || name}
        </label>
        <input 
        id={name}
        type={type} 
        name={name} 
        value={value} 
        onChange={handleChange} 
        className='form-input'/>
    </div>
    )
}

export default FormRow;