import React from 'react';

function SearchItem(props) {

    return (
      <li onClick={props.onClick}>
        { props.image &&
          <img src={props.image} alt="logo"></img>
        }
        <span>{props.content}</span>
      </li>
    );
}

export default SearchItem;