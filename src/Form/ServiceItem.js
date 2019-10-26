import React from 'react';
import check from '../img/check.png';
import cross from '../img/cross.png';
import question from '../img/question.png';
import stop from '../img/stop.png';

function ServiceItem(props) {
    let image = stop;
    if (props.included === 2){
        image = check;
    }
    else if (props.included === 1){
        image = stop;
    }
    else if (props.included === 0){
        image = question;
    }
    return (
        <div className="service-item" >
            {
                image &&
                <img src={image} alt="state"/>
            }
            <span>{props.content}</span>
            <button className="btn-no-style" onClick={props.onDelete}>
                <img src={cross} alt="Cross"/>
            </button>
        </div>
    );
}

export default ServiceItem;