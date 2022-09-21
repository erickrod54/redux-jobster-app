import React from "react";

/**Jobster app - version 1 - 'FormRow' - Features:
 * 
 *    --> Building 'FormRow' Component. 
 * 
 * Note: 'FormRow' Component has been built in order to
 * handle the combination of 'labels' and 'row' built 
 * dynamiclly for name, email, and password 
 * respectivelly and more 
 */

const FormRow = ({ type, name, value, handleChange, labelText }) => {

    return(
    <div className="form-row">
        <label htmlFor={name} className="form-label">
            {name}
        </label>
        <input 
        type={type} 
        name={name} 
        value={value} 
        onChange={handleChange} 
        className='form-input'/>
    </div>
    )
}

export default FormRow;