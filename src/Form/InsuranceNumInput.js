import React from 'react';

function InsuranceNumInput(props) {
    return(
        <div className="form-group">
            <input 
            type="text" 
            name={props.id} 
            id={props.id} 
            required
            placeholder={props.placeholder} 
            onChange={props.onChange}
            pattern={props.pattern}/>

            <div className="info hidden">{props.info}</div>
        </div>
    );
}

export default InsuranceNumInput;