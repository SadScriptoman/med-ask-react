import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import Context from '../context';
import SearchItem from './SearchItem';
import SearchInput from './SearchInput';

function SearchCompanies(props) {
  const {companies, companiesDynamic, setCompanies, checkMatches, checkValid, checkFormState} = useContext(Context),
        [classesList, setClassesList] = useState(["search-list"]);
  let mouseOver = false;
  return (
      <div className="insurance-search-wrapper">
        <div id="insurance-companies-search" className="insurance-search" 
          onMouseLeave={()=>{mouseOver = false;}} 
          onMouseOver={()=>{mouseOver = true;}}>
          <SearchInput 
            id="company" 
            placeholder="Выберите страховую компанию" 
            value={props.currentCompany.name}
            img={props.currentCompany.logo}
            pattern = {props.currentCompany.name}
            basePattern ={"undefined"}
            usePattern = {true}
            required="required"
            onFocus={()=>{
              const companiesSearchClass = document.getElementById("insurance-companies-search").classList;
              if(!companiesSearchClass.contains("collapsed")) 
                companiesSearchClass.add("collapsed"); 
            }} 
            onBlur={()=>{
              if(!mouseOver) document.getElementById("insurance-companies-search").classList.remove("collapsed");
            }} 
            dataAddClassesTo = "#insurance-companies-search"
            onChange={(e)=>{
              const target = e.target;
              checkValid(target, props.setInfoCompanies,  
                checkMatches(target.value, companies, setCompanies, props.setCurrentCompany), 0, "Данные введены неверно!"
              );
              checkFormState(document.getElementById("main-form"), props.setFormState);
              
              if (companiesDynamic.length > 3)
                setClassesList(["search-list", "scroll-y"]);
              else
                setClassesList(["search-list"]);
            }}
          >
          </SearchInput>
          <ul className={classesList.join(" ")}>
              {companiesDynamic.map( (company, idx) =>{
                  return <SearchItem 
                    content={company.name} 
                    image={company.logo} 
                    key={idx} 
                    onClick={ () => {
                      const input = document.getElementById("company"),
                            companiesSearchClass = document.getElementById("insurance-companies-search").classList;
                      companiesSearchClass.remove("collapsed"); 
                      input.value = company.name; 
                      checkMatches(input.value, companies, setCompanies, props.setCurrentCompany);
                      checkValid(input, false, true, true);
                      checkFormState(document.getElementById("main-form"), props.setFormState);
                    }}>
                    
                  </SearchItem>
              })}
          </ul>
        </div>
        <div className="info hidden">{props.currentCompany.info ? props.currentCompany.info : props.infoCompanies}</div>
      </div>
  );
}

export default SearchCompanies;