import React from 'react';
import { useState } from 'react';
import Context from '../context';
import { useContext } from 'react';
import SearchItem from './SearchItem';

function Search() {
    const {checkMatches} = useContext(Context);
    const {companies} = useContext(Context);
    const {companiesDynamic} = useContext(Context);
    const {setCompanies} = useContext(Context);
    const [classes, setClasses] = useState(["insurance-search"]);
    const [tel, setTel] = useState("");
    let mouseOver = false;
    return (
        <div className="insurance-search-wrapper">
          <div className={classes.join(" ")} onMouseLeave={()=>{mouseOver = false}} onMouseOver={()=>{mouseOver = true}}>
            <input type="search" name="company" id="company" required="required" autoComplete="off" placeholder="Выберите страховую компанию" onFocus={()=>{setClasses(classes.concat("collapsed"));}} onBlur={()=>{if(!mouseOver) setClasses(["insurance-search"]);}} onChange={(e)=>{checkMatches(e.target.value, companies, setCompanies);setTel("");}}/>
            <ul className="search-list">
                {companiesDynamic.map( (company, idx) =>{
                    return <SearchItem 
                      content={company.name} 
                      image={company.logo} 
                      key={idx} 
                      onClick={ () => {
                        const input = document.getElementById("company");
                        setClasses(["insurance-search"]); 
                        input.value = company.name; 
                        if (company.name === input.value) setTel(company.tel);}
                      }>
                      
                    </SearchItem>
                })}
            </ul>
          </div>
          <div className="info">{tel}</div>
        </div>
    );
}

export default Search;