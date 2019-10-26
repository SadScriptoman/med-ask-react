import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import Context from '../context';
import SearchItem from './SearchItem';
import SearchInput from './SearchInput';

function SearchServices(props) {
    const {services, servicesDynamic, setServices, checkMatches, servicesChosen, setServicesChosen, addService, checkValid, checkFormState} = useContext(Context),
        [classesList, setClassesList] = useState(["search-list", "scroll-y"]);
    let mouseOver = false;
    return (
        <div className="insurance-search-wrapper">
            <div id="insurance-services-search" className="insurance-search" 
                onMouseLeave={()=>{mouseOver = false;}} 
                onMouseOver={()=>{mouseOver = true;}}>
                <SearchInput 
                    id="services" 
                    placeholder="Введите запрашиваемую услугу для пациента" 
                    required={servicesChosen.length===0 ? "required":""}
                    onFocus={()=>{
                      const servicesSearchClass = document.getElementById("insurance-services-search").classList;
                      if(!servicesSearchClass.contains("collapsed")) 
                      servicesSearchClass.add("collapsed"); 
                    }} 
                    onBlur={()=>{
                      if(!mouseOver) document.getElementById("insurance-services-search").classList.remove("collapsed");
                    }}  
                    dataAddClassesTo = "#insurance-services-search"
                    
                    onChange={(e)=>{
                        let len = checkMatches(e.target.value, services, setServices); 
                        if (len > 3)
                          setClassesList(["search-list", "scroll-y"]);
                        else
                          setClassesList(["search-list"]);
                    }}
                    onKeyPress = {(e) =>{
                        if (e.key === "Enter") {
                            const value = e.target.value;
                            e.preventDefault();
                            if (value.length>=3){
                                addService(e.target.value, servicesChosen, setServicesChosen);
                                e.target.value = "";
                                checkValid(e.target, props.setInfoServices, true, true, "", "");
                            }
                            else checkValid(e.target, props.setInfoServices, true, false, "Минимум 3 буквы");
                            checkFormState(document.getElementById("main-form"), props.setFormState);                  
                        }
                    }}
                >
                </SearchInput>
                <ul className={classesList.join(" ")}>
                    {servicesDynamic.map( (service, idx) =>{
                        return <SearchItem 
                          content={service.name} 
                          key={idx} 
                          
                          onClick={ () => 
                              {
                                const input = document.getElementById("services");
                                checkValid(input, false, true, true);
                                props.setInfoServices("");
                                document.getElementById("insurance-services-search").classList.remove("collapsed")
                                input.value = ""; 
                                addService(service.name, servicesChosen, setServicesChosen);
                                checkFormState(document.getElementById("main-form"), props.setFormState);
                              }
                          }>
                        </SearchItem>
                    })}
                </ul>
            </div>
            {
                props.infoServices &&
                <div className="info hidden">{props.infoServices}</div>
            }
        </div>
    );
}

export default SearchServices;