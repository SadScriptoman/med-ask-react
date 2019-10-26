import React from 'react';

function SearchInput(props) {
    let img;
    if (props.img){
        img = <img src={props.img} alt="logo"/>;
    }
    return(
        <label>
            {img}
            <input 
                type="search" 
                name={props.id} 
                id={props.id} 
                required={props.required}
                autoComplete="off" 
                placeholder={props.placeholder} 
                onFocus={props.onFocus} 
                onBlur={props.onBlur} 
                onChange={props.onChange}
                onKeyPress={props.onKeyPress}
                pattern={(props.pattern && props.basePattern) ? props.pattern : props.basePattern}
                value={props.value}
                className={props.img ? "with-img": ""}
                data-add-classes-to={props.dataAddClassesTo}
            />
        </label>
    );
}

export default SearchInput;